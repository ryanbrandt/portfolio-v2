import * as t from "./actionTypes";
import { AdminTab, ResumeItemForm, WorkItemForm } from "./types";

export interface adminInitRequest {
  type: t.ADMIN_INIT_REQUEST;
}

export function adminInitRequest(): adminInitRequest {
  return {
    type: t.ADMIN_INIT_REQUEST,
  };
}

export interface adminSetActiveTab {
  type: t.ADMIN_SET_ACTIVE_TAB;
  tab: AdminTab;
}

export function adminSetActiveTab(tab: AdminTab): adminSetActiveTab {
  return {
    type: t.ADMIN_SET_ACTIVE_TAB,
    tab,
  };
}

export interface adminSetQuery {
  type: t.ADMIN_SET_QUERY;
  query: string;
}

export function adminSetQuery(query: string): adminSetQuery {
  return {
    type: t.ADMIN_SET_QUERY,
    query,
  };
}

export interface adminSetActiveItemId {
  type: t.ADMIN_SET_ACTIVE_ITEM_ID;
  id: number;
}

export function adminSetActiveItemId(id: number): adminSetActiveItemId {
  return {
    type: t.ADMIN_SET_ACTIVE_ITEM_ID,
    id,
  };
}

export interface adminUpdateResumeItemRequest {
  type: t.ADMIN_UPDATE_RESUME_ITEM_REQUEST;
  item: ResumeItemForm;
  resolve: any;
  reject: any;
}

export function adminUpdateResumeItemRequest(
  item: ResumeItemForm,
  resolve: any,
  reject: any
): adminUpdateResumeItemRequest {
  return {
    type: t.ADMIN_UPDATE_RESUME_ITEM_REQUEST,
    item,
    resolve,
    reject,
  };
}

export interface adminCreateResumeItemRequest {
  type: t.ADMIN_CREATE_RESUME_ITEM_REQUEST;
  item: ResumeItemForm;
  resolve: any;
  reject: any;
}

export function adminCreateResumeItemRequest(
  item: ResumeItemForm,
  resolve: any,
  reject: any
): adminCreateResumeItemRequest {
  return {
    type: t.ADMIN_CREATE_RESUME_ITEM_REQUEST,
    item,
    resolve,
    reject,
  };
}

export interface adminDeleteResumeItemRequest {
  type: t.ADMIN_DELETE_RESUME_ITEM_REQUEST;
  id: number;
}

export function adminDeleteResumeItemRequest(
  id: number
): adminDeleteResumeItemRequest {
  return {
    type: t.ADMIN_DELETE_RESUME_ITEM_REQUEST,
    id,
  };
}

export interface adminUpdateWorkItemRequest {
  type: t.ADMIN_UPDATE_WORK_ITEM_REQUEST;
  item: WorkItemForm;
  resolve: any;
  reject: any;
}

export function adminUpdateWorkItemRequest(
  item: WorkItemForm,
  resolve: any,
  reject: any
): adminUpdateWorkItemRequest {
  return {
    type: t.ADMIN_UPDATE_WORK_ITEM_REQUEST,
    item,
    resolve,
    reject,
  };
}

export interface adminCreateWorkItemRequest {
  type: t.ADMIN_CREATE_WORK_ITEM_REQUEST;
  item: WorkItemForm;
  resolve: any;
  reject: any;
}

export function adminCreateWorkItemRequest(
  item: WorkItemForm,
  resolve: any,
  reject: any
): adminCreateWorkItemRequest {
  return {
    type: t.ADMIN_CREATE_WORK_ITEM_REQUEST,
    item,
    resolve,
    reject,
  };
}

export interface adminDeleteWorkItemRequest {
  type: t.ADMIN_DELETE_WORK_ITEM_REQUEST;
  id: number;
}

export function adminDeleteWorkItemRequest(
  id: number
): adminDeleteWorkItemRequest {
  return {
    type: t.ADMIN_DELETE_WORK_ITEM_REQUEST,
    id,
  };
}

export type Action =
  | adminInitRequest
  | adminSetActiveTab
  | adminSetQuery
  | adminSetActiveItemId
  | adminUpdateResumeItemRequest
  | adminUpdateWorkItemRequest
  | adminCreateResumeItemRequest
  | adminCreateWorkItemRequest
  | adminDeleteWorkItemRequest
  | adminDeleteResumeItemRequest;
