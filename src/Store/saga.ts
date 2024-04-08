import { fork } from "redux-saga/effects"
import propertySaga from "./property/saga"

export function* rootSaga() {
  yield fork(propertySaga)
}
