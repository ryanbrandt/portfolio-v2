import { all } from "redux-saga/effects";

import resumeSaga from "../Resumé/sagas";
import blogSaga from "../Blog/sagas";
import workSaga from "../Work/sagas";
import contactSaga from "../Contact/sagas";
import authSaga from "../Auth/sagas";

export default function* () {
  yield all([resumeSaga(), blogSaga(), workSaga(), contactSaga(), authSaga()]);
}
