import api from "../utils/api";

const parseTags = (payload: any) => {
  let parsed = payload;
  if (payload.tags) {
    parsed = {
      ...payload,
      tags: JSON.stringify(payload.tags),
    };
  }

  return parsed;
};

export const handlePromisifiedCreate = async (
  path: string,
  payload: any,
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
  payload: any,
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
