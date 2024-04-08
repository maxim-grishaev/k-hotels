import { all, call, fork, put, takeLatest } from "redux-saga/effects"
import { Venue, fetchData } from "./fetchData"
import { venueSlice } from "./venueSlice"

export function* getPropertiesEffect() {
  try {
    const properties: Venue[] = yield call(fetchData)
    yield put(venueSlice.actions.success(properties))
  } catch (e) {
    yield put(venueSlice.actions.error(e))
  }
}

function* watchGetProperties() {
  yield takeLatest(venueSlice.actions.requestStart.type, getPropertiesEffect)
}

export function* propertySaga() {
  yield all([fork(watchGetProperties)])
}
