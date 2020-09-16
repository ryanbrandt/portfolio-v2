import { takeLatest, all } from "redux-saga/effects";

import * as t from "./actionTypes";

export function* handleBlogListRequest() {}

export function* watchBlogListRequest() {
  yield takeLatest(t.BLOG_LIST_REQUEST, handleBlogListRequest);
}

export default function* () {
  yield all([watchBlogListRequest()]);
}
