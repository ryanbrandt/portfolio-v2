import { all } from "redux-saga/effects";

import resumeSaga from "../Resumé/sagas";

export default function* () {
  yield all([resumeSaga()]);
}
