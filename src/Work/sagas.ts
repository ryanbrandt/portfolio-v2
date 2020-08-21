import { takeLatest, all } from "redux-saga/effects";

import * as t from "./actionTypes";
import * as a from "./actions";
import { watchBlogListRequest } from "../Blog/sagas";

export function* handleWorkListRequest() {}

export function* watchWorkListRequest() {
  yield takeLatest(t.WORK_LIST_REQUEST, handleWorkListRequest);
}

export default function* () {
  yield all([watchBlogListRequest()]);
}
