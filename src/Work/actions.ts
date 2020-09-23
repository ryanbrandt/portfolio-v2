import * as t from "./actionTypes";

export interface workListRequest {
  type: t.WORK_LIST_REQUEST;
}

export function workListRequest(): workListRequest {
  return {
    type: t.WORK_LIST_REQUEST,
  };
}

export interface workListSuccess {
  type: t.WORK_LIST_SUCCESS;
  workList: Array<any>; // TODO
}

export function workListSuccess(workList: Array<any>): workListSuccess {
  return {
    type: t.WORK_LIST_SUCCESS,
    workList,
  };
}

export interface setActiveWorkItem {
  type: t.SET_ACTIVE_WORK_ITEM;
  index: number;
}

export function setActiveWorkItem(index: number): setActiveWorkItem {
  return {
    type: t.SET_ACTIVE_WORK_ITEM,
    index,
  };
}

export type Action = workListRequest | workListSuccess | setActiveWorkItem;
