import { takeLatest, all } from "redux-saga/effects";

import * as t from "./actionTypes";
import * as a from "./actions";

export function* handleResumeListRequest() {}

export function* watchResumeListRequest() {
  yield takeLatest(t.RESUME_LIST_REQUEST, handleResumeListRequest);
}

export default function* () {
  yield all([watchResumeListRequest]);
}
