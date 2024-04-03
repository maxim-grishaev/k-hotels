import { createAction } from "@reduxjs/toolkit"
import { DataProperty } from "./service"

export const makePropertiesRequest = createAction(`[PROPERTIES] GET`)
export const makePropertiesError = createAction<unknown>(`[PROPERTIES] ERROR`)
export const makePropertiesResponse = createAction<DataProperty[]>(
  `[PROPERTIES] RESPONSE_OK`,
)
