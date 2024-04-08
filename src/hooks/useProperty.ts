import { useSelector } from "react-redux"
import { createSelector } from "@reduxjs/toolkit"
import {
  selectAllProperties,
  selectOneProperty,
} from "../Store/property/selectors"
import { RootState } from "../Store/store"

const selectBranch = (state: RootState) => state.property

export const selectAll = createSelector(selectBranch, selectAllProperties)
export const useAllProperties = () => useSelector(selectAll)

export const useOneProperty = (id?: string) =>
  useSelector((root: RootState) =>
    id === undefined ? undefined : selectOneProperty(selectBranch(root), id),
  )
