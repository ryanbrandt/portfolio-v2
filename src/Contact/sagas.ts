/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { all, takeLatest, call, put, delay } from "redux-saga/effects";

import * as t from "./actionTypes";
import { sendMessageRequest } from "./actions";
import { setContentLoading } from "../App/actions";

import api from "../utils/api";

export function* handleSendMessageRequest(action: sendMessageRequest) {
  const { payload, resolve, reject } = action;

  yield put(setContentLoading(true));

  let success = true;
  try {
    const { ok } = yield call(api.post, "/contact", payload);

    if (!ok) {
      success = false;
    }
  } catch (e) {
    success = false;
  } finally {
    if (success) {
      resolve("Message successfully sent! I will be in touch!");
    } else {
      reject("Your message couldn't be processed. Try again?");
    }

    yield delay(1000);
    yield put(setContentLoading(false));
  }
}

export function* watchSendMessageRequest() {
  yield takeLatest(t.SEND_MESSAGE_REQUEST, handleSendMessageRequest);
}

export default function* () {
  yield all([watchSendMessageRequest()]);
}
