import { all, call, put, takeLatest } from "redux-saga/effects";
import { blogListRequest } from "../Blog/actions";
import { resumeListRequest } from "../Resumé/actions";
import { workListRequest } from "../Work/actions";

import * as t from "./actionTypes";
import * as a from "./actions";
import api from "../utils/api";

function* handlePromisifiedUpdate(
  path: string,
  payload: any,
  resolve: any,
  reject: any
) {
  let success = true;
  try {
    const { ok } = yield call(api.put, path, payload);

    if (!ok) {
      success = false;
    }
  } catch (e) {
    console.log(`Failed to complete item update request ${e}`);
    success = false;
  } finally {
    if (success) {
      resolve("Successfully updated item!");
    } else {
      reject("Failed to update item. Try again?");
    }
  }
}

export function* handleAdminInitRequest() {
  yield put(workListRequest());
  yield put(resumeListRequest());
  yield put(blogListRequest());
}

export function* watchAdminInitRequest() {
  yield takeLatest(t.ADMIN_INIT_REQUEST, handleAdminInitRequest);
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
    watchAdminUpdateResumeItemRequest(),
    watchAdminUpdateWorkItemRequest(),
  ]);
}
