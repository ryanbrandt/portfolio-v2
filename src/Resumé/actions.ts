import { ResumeItem } from "../utils/types";
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
  resumeList: Array<ResumeItem>;
}

export function resumeListSuccess(
  resumeList: Array<ResumeItem>
): resumeListSuccess {
  return {
    type: t.RESUME_LIST_SUCCESS,
    resumeList,
  };
}

export type Action = resumeListRequest | resumeListSuccess;
