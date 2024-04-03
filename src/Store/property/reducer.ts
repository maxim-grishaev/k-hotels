import { createReducer } from "@reduxjs/toolkit"
import {
  makePropertiesError,
  makePropertiesRequest,
  makePropertiesResponse,
} from "./actions"
import { DataProperty } from "./service"

const initState = {
  loading: true,
  error: null as string | null,
  properties: [] as DataProperty[],
}

export type PropertyState = typeof initState

export const reducer = createReducer(initState, (builder) => {
  builder
    .addCase(makePropertiesRequest, (state) => {
      state.loading = true
    })
    .addCase(makePropertiesResponse, (state, action) => {
      state.properties = action.payload
      state.loading = false
    })
    .addCase(makePropertiesError, (state, action) => {
      state.loading = false
      state.error = String(action.payload)
    })
})
