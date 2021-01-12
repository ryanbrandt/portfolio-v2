/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { takeLatest, all, put, call, delay } from "redux-saga/effects";

import api from "../utils/api";

import { setContentLoading } from "../App/actions";
import * as t from "./actionTypes";
import * as a from "./actions";

export function* handleResumeListRequest() {
  yield put(setContentLoading(true));

  try {
    const { ok, data } = yield call(api.get, "/resume");

    if (ok) {
      yield put(a.resumeListSuccess(data));
    }
  } catch (e) {
    console.log(e);
  } finally {
    yield delay(1000);
    yield put(setContentLoading(false));
  }
}

export function* watchResumeListRequest() {
  yield takeLatest(t.RESUME_LIST_REQUEST, handleResumeListRequest);
}

export default function* () {
  yield all([watchResumeListRequest()]);
}
