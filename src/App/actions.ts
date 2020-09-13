import * as t from "./actionTypes";

export interface setContentLoading {
  type: t.SET_CONTENT_LOADING;
  loading: boolean;
}

export function setContentLoading(loading: boolean): setContentLoading {
  return {
    type: t.SET_CONTENT_LOADING,
    loading,
  };
}

export type Action = setContentLoading;
