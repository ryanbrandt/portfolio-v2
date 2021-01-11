import api from "../utils/api";
import {
  ResumeItemForm,
  ResumeItemPayload,
  UploadPayload,
  WorkItemForm,
  WorkItemPayload,
} from "./types";
import { BACKEND_UPLOAD_BUCKET } from "../utils/secrets";

const parseTags = (
  payload: ResumeItemForm | WorkItemForm
): ResumeItemPayload | WorkItemPayload => {
  const parsed = {
    ...payload,
    tags: JSON.stringify(payload.tags),
  };

  return parsed;
};

const getUploadUrl = async (file: File): Promise<string> => {
  const { name, type } = file;

  const payload: UploadPayload = {
    bucket: "resume-work-images",
    filename: name,
    fileType: type,
  };

  const { ok, data, status } = await api.post<{ url: string }>(
    "/upload",
    payload
  );

  if (ok && data) {
    const { url } = data;

    return url;
  }

  throw new Error(`Failed to get presigned URL with ${status}`);
};

export const handlePromisifiedCreate = async (
  path: string,
  payload: ResumeItemForm | WorkItemForm,
  resolve: any,
  reject: any
): Promise<void> => {
  let success = true;
  const parsedPaylod = parseTags(payload);

  try {
    const { ok } = await api.post(path, parsedPaylod);

    if (!ok) {
      success = false;
    }
  } catch (e) {
    console.log(`Failed to complete item create request ${e}`);
    success = false;
  } finally {
    if (success) {
      resolve("Successfully created item!");
    } else {
      reject("Failed to create item. Try again?");
    }
  }
};

export const handlePromisifiedUpdate = async (
  path: string,
  payload: ResumeItemForm | WorkItemForm,
  resolve: any,
  reject: any
): Promise<void> => {
  let success = true;
  const parsedPaylod = parseTags(payload);

  try {
    const { ok } = await api.put(path, parsedPaylod);

    if (!ok) {
      success = false;
    }
  } catch (e) {
    console.log(`Failed to complete item update request ${e}`);
    success = false;
  } finally {
    if (success) {
      resolve("Successfully updated item!");
    } else {
      reject("Failed to update item. Try again?");
    }
  }
};

export const handleDelete = async (
  path: string,
  id: number
): Promise<boolean> => {
  let success = false;
  try {
    const { ok, status } = await api.delete(`${path}/${id}`);

    if (ok) {
      success = true;
    } else {
      console.log(`Failed to delete item with ${status}`);
    }
  } catch (e) {
    console.log(`Failed to complete item delete request ${e}`);
  }

  return success;
};

export const handleUploadFile = async (file: File): Promise<string> => {
  const uploadUrl = await getUploadUrl(file);

  const { Authorization } = api.headers;
  api.deleteHeader("Authorization");

  const { ok, status } = await api.put(uploadUrl, file, {
    headers: {
      "Content-Type": file.type,
    },
  });

  api.setHeader("Authorization", Authorization);

  if (ok) {
    return `https://${BACKEND_UPLOAD_BUCKET}.s3.amazonaws.com/${file.name}`;
  }

  throw new Error(`Failed to upload to signed url with ${status}`);
};
