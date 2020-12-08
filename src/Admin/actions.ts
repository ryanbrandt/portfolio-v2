import * as t from "./actionTypes";
import { AdminTab } from "./types";

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

export type Action = adminInitRequest | adminSetActiveTab | adminSetQuery;
