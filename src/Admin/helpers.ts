import api from "../utils/api";
import {
  ResumeItemForm,
  ResumeItemPayload,
  WorkItemForm,
  WorkItemPayload,
} from "./types";

const parseTags = (
  payload: ResumeItemForm | WorkItemForm
): ResumeItemPayload | WorkItemPayload => {
  const parsed = {
    ...payload,
    tags: JSON.stringify(payload.tags),
  };

  return parsed;
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
