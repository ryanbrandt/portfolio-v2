/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { all, call, put, takeLatest } from "redux-saga/effects";
import { blogListRequest } from "../Blog/actions";
import { resumeListRequest } from "../Resumé/actions";
import { workListRequest } from "../Work/actions";

import {
  handleDelete,
  handlePromisifiedCreate,
  handlePromisifiedUpdate,
  handleUploadFile,
} from "./helpers";
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

export function* handleAdminDeleteResumeItemRequest(
  action: a.adminDeleteResumeItemRequest
) {
  const { id } = action;

  const success: boolean = yield call(handleDelete, "/resume", id);

  if (success) {
    yield put(resumeListRequest());
  }
}

export function* watchAdminDeleteResumeItemRequest() {
  yield takeLatest(
    t.ADMIN_DELETE_RESUME_ITEM_REQUEST,
    handleAdminDeleteResumeItemRequest
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

  const parsedPayload: any = {
    ...item,
    primaryImage: item.originalPrimaryImage,
    secondaryImage: item.originalSecondaryImage,
  };

  try {
    if (item.primaryImage) {
      const imageUrl: string = yield call(handleUploadFile, item.primaryImage);
      parsedPayload.primaryImage = imageUrl;
    }

    if (item.secondaryImage) {
      const imageUrl: string = yield call(
        handleUploadFile,
        item.secondaryImage
      );
      parsedPayload.secondaryImage = imageUrl;
    }
  } catch (e) {
    reject("Failed to upload image. Try again?");
    return;
  }

  yield call(handlePromisifiedCreate, "/work", parsedPayload, resolve, reject);
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

  const parsedPayload: any = {
    ...item,
    primaryImage: item.originalPrimaryImage,
    secondaryImage: item.originalSecondaryImage,
  };

  try {
    if (item.primaryImage) {
      const imageUrl: string = yield call(handleUploadFile, item.primaryImage);
      parsedPayload.primaryImage = imageUrl;
    }

    if (item.secondaryImage) {
      const imageUrl: string = yield call(
        handleUploadFile,
        item.secondaryImage
      );
      parsedPayload.secondaryImage = imageUrl;
    }
  } catch (e) {
    reject("Failed to upload images. Try again?");
    return;
  }

  yield call(
    handlePromisifiedUpdate,
    `/work/${item.id}`,
    parsedPayload,
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

export function* handleAdminDeleteWorkItemRequest(
  action: a.adminDeleteWorkItemRequest
) {
  const { id } = action;

  const success: boolean = yield call(handleDelete, "/work", id);

  if (success) {
    yield put(workListRequest());
  }
}

export function* watchAdminDeleteWorkItemRequest() {
  yield takeLatest(
    t.ADMIN_DELETE_WORK_ITEM_REQUEST,
    handleAdminDeleteWorkItemRequest
  );
}

export default function* rootSaga() {
  yield all([
    watchAdminInitRequest(),
    watchAdminCreateResumeItemRequest(),
    watchAdminUpdateResumeItemRequest(),
    watchAdminDeleteResumeItemRequest(),
    watchAdminCreateWorkItemRequest(),
    watchAdminUpdateWorkItemRequest(),
    watchAdminDeleteWorkItemRequest(),
  ]);
}
