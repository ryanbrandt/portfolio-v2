import { all, call, put, takeLatest } from "redux-saga/effects";
import { Auth } from "aws-amplify";

import awsConfig from "../utils/awsConfig";
import * as a from "./actions";
import * as t from "./actionTypes";

export function* handleAdminLoginRequest(action: a.adminLoginRequest) {
  const { resolve, reject, email, password } = action;

  let success = true;
  try {
    yield call([Auth, Auth.configure], awsConfig);
    yield call([Auth, Auth.signIn], email, password);
    const user = yield call([Auth, Auth.currentAuthenticatedUser]);
    yield put(a.adminLoginSuccess(user));
  } catch (e) {
    success = false;
    console.log(`Failed to authenticate admin ${e}`);
  } finally {
    if (success) {
      resolve();
    } else {
      reject("Invalid email or password provided.");
    }
  }
}

export function* watchAdminLoginRequest() {
  yield takeLatest(t.ADMIN_LOGIN_REQUEST, handleAdminLoginRequest);
}

export default function* rootSaga() {
  yield all([watchAdminLoginRequest()]);
}
