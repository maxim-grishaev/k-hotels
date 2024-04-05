import { fork } from "redux-saga/effects"
import { propertySaga } from "./venue/saga"

export function* rootSaga() {
  yield fork(propertySaga)
}
