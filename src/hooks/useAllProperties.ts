import { useSelector } from "react-redux"
import { createSelector } from "@reduxjs/toolkit"
import { selectAllProperties } from "../Store/venue/selectors"
import { selectVenueBranch } from "../Store/selectors"

const selectAll = createSelector(selectVenueBranch, selectAllProperties)
export const useAllProperties = () =>
  useSelector(selectAll).map((it) => it.property)
