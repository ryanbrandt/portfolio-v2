import { all, call, put, takeLatest } from "redux-saga/effects";
import { blogListRequest } from "../Blog/actions";
import { resumeListRequest } from "../Resumé/actions";
import { workListRequest } from "../Work/actions";

import { handlePromisifiedCreate, handlePromisifiedUpdate } from "./helpers";
import * as t from "./actionTypes";
import * as a from "./actions";

export function* handleAdminInitRequest() {
  yield put(workListRequest());
  yield put(resumeListRequest());
  yield put(blogListRequest());
}

export function* watchAdminInitRequest() {
  yield takeLatest(t.ADMIN_INIT_REQUEST, handleAdminInitRequest);
}

export function* handleAdminCreateResumeItemRequest(
  action: a.adminCreateResumeItemRequest
) {
  const { item, resolve, reject } = action;

  yield call(handlePromisifiedCreate, "/resume", item, resolve, reject);
}

export function* watchAdminCreateResumeItemRequest() {
  yield takeLatest(
    t.ADMIN_CREATE_RESUME_ITEM_REQUEST,
    handleAdminCreateResumeItemRequest
  );
}

export function* handleAdminUpdateResumeItemRequest(
  action: a.adminUpdateResumeItemRequest
) {
  const { item, resolve, reject } = action;

  yield call(
    handlePromisifiedUpdate,
    `/resume/${item.id}`,
    item,
    resolve,
    reject
  );
}

export function* watchAdminUpdateResumeItemRequest() {
  yield takeLatest(
    t.ADMIN_UPDATE_RESUME_ITEM_REQUEST,
    handleAdminUpdateResumeItemRequest
  );
}

export function* handleAdminCreateWorkItemRequest(
  action: a.adminCreateWorkItemRequest
) {
  const { item, resolve, reject } = action;

  yield call(handlePromisifiedCreate, "/work", item, resolve, reject);
}

export function* watchAdminCreateWorkItemRequest() {
  yield takeLatest(
    t.ADMIN_CREATE_WORK_ITEM_REQUEST,
    handleAdminCreateWorkItemRequest
  );
}

export function* handleAdminUpdateWorkItemRequest(
  action: a.adminUpdateWorkItemRequest
) {
  const { item, resolve, reject } = action;

  yield call(
    handlePromisifiedUpdate,
    `/work/${item.id}`,
    item,
    resolve,
    reject
  );
}

export function* watchAdminUpdateWorkItemRequest() {
  yield takeLatest(
    t.ADMIN_UPDATE_WORK_ITEM_REQUEST,
    handleAdminUpdateWorkItemRequest
  );
}

export default function* rootSaga() {
  yield all([
    watchAdminInitRequest(),
    watchAdminCreateResumeItemRequest(),
    watchAdminUpdateResumeItemRequest(),
    watchAdminCreateWorkItemRequest(),
    watchAdminUpdateWorkItemRequest(),
  ]);
}
