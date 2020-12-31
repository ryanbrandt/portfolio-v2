import { WorkItem } from "../utils/types";
import * as t from "./actionTypes";
import { WorkTab } from "./types";

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
  workList: Array<WorkItem>;
}

export function workListSuccess(workList: Array<WorkItem>): workListSuccess {
  return {
    type: t.WORK_LIST_SUCCESS,
    workList,
  };
}

export interface setActiveWorkItem {
  type: t.SET_ACTIVE_WORK_ITEM;
  id: number;
}

export function setActiveWorkItem(id: number): setActiveWorkItem {
  return {
    type: t.SET_ACTIVE_WORK_ITEM,
    id,
  };
}

export interface setActiveWorkTab {
  type: t.SET_ACTIVE_WORK_TAB;
  tab: WorkTab;
}

export function setActiveWorkTab(tab: WorkTab): setActiveWorkTab {
  return {
    type: t.SET_ACTIVE_WORK_TAB,
    tab,
  };
}

export interface setWorkQuery {
  type: t.SET_WORK_QUERY;
  query: string;
}

export function setWorkQuery(query: string): setWorkQuery {
  return {
    type: t.SET_WORK_QUERY,
    query,
  };
}

export type Action =
  | workListRequest
  | workListSuccess
  | setActiveWorkItem
  | setWorkQuery
  | setActiveWorkTab;
