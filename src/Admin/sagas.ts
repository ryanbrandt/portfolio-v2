import { all, put, takeLatest } from "redux-saga/effects";
import { blogListRequest } from "../Blog/actions";
import { resumeListRequest } from "../Resumé/actions";
import { workListRequest } from "../Work/actions";

import * as t from "./actionTypes";

export function* handleAdminInitRequest() {
  yield put(workListRequest());
  yield put(resumeListRequest());
  yield put(blogListRequest());
}

export function* watchAdminInitRequest() {
  yield takeLatest(t.ADMIN_INIT_REQUEST, handleAdminInitRequest);
}

export default function* rootSaga() {
  yield all([watchAdminInitRequest()]);
}
