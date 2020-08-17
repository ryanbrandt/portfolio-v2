import * as t from "./actionTypes";

export interface resumeListRequest {
  type: t.RESUME_LIST_REQUEST;
}

export function resumeListRequest(): resumeListRequest {
  return {
    type: t.RESUME_LIST_REQUEST,
  };
}

export interface resumeListSuccess {
  type: t.RESUME_LIST_SUCCESS;
  resumeList: Array<any>; // TODO
}

export function resumeListSuccess(resumeList: Array<any>): resumeListSuccess {
  return {
    type: t.RESUME_LIST_SUCCESS,
    resumeList,
  };
}

export type Action = resumeListRequest | resumeListSuccess;
