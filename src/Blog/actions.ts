import * as t from "./actionTypes";

export interface blogListRequest {
  type: t.BLOG_LIST_REQUEST;
}

export function blogListRequest(): blogListRequest {
  return {
    type: t.BLOG_LIST_REQUEST,
  };
}

export interface blogListSuccess {
  type: t.BLOG_LIST_SUCCESS;
  blogList: Array<any>; // TODO
}

export function blogListSuccess(blogList: Array<any>) {
  return {
    type: t.BLOG_LIST_SUCCESS,
    blogList,
  };
}

export type Action = blogListRequest | blogListSuccess;
