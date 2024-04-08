import { all, call, fork, put, takeLatest } from "redux-saga/effects"
import { DataProperty, fetchData } from "./service"
import {
  makePropertiesResponse,
  makePropertiesRequest,
  makePropertiesError,
} from "./actions"

function* getPropertiesEffect() {
  try {
    const properties: DataProperty[] = yield call(fetchData)
    yield put(makePropertiesResponse(properties))
  } catch (e) {
    yield put(makePropertiesError(e))
  }
}

function* watchGetProperties() {
  yield takeLatest(makePropertiesRequest.type, getPropertiesEffect)
}
export default function* propertySaga() {
  yield all([fork(watchGetProperties)])
}
