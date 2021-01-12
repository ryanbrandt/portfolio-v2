/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { takeLatest, all, put, call, delay } from "redux-saga/effects";

import api from "../utils/api";
import { setContentLoading } from "../App/actions";
import * as t from "./actionTypes";
import * as a from "./actions";

export function* handleWorkListRequest() {
  yield put(setContentLoading(true));

  try {
    const { ok, data } = yield call(api.get, "/work");
    if (ok) {
      yield put(a.workListSuccess(data));
    }
  } catch (e) {
    console.log(e);
  } finally {
    yield delay(1000);
    yield put(setContentLoading(false));
  }
}

export function* watchWorkListRequest() {
  yield takeLatest(t.WORK_LIST_REQUEST, handleWorkListRequest);
}

export default function* () {
  yield all([watchWorkListRequest()]);
}
