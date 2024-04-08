import { useCallback } from "react"
import { useDispatch, useSelector } from "react-redux"
import { selectVenueBranch } from "../Store/selectors"
import { PolicyOfCancellation, PolicyOfNoShow } from "../Store/venue/fetchData"
import { venueSlice } from "../Store/venue/venueSlice"
import {
  selectOnePolicyOfCancellation,
  selectOnePolicyOfNoShow,
} from "../Store/venue/selectors"
import { RootState } from "../Store/store"

export const usePolicyOfCancellation = ({
  propertyId,
  policyId,
}: {
  propertyId: string
  policyId: string
}) => {
  const dispatch = useDispatch()

  const policy = useSelector((root: RootState) =>
    selectOnePolicyOfCancellation(
      selectVenueBranch(root),
      propertyId,
      policyId,
    ),
  )

  const update = useCallback(
    (data: Partial<Omit<PolicyOfCancellation, "id">>) => {
      dispatch(
        venueSlice.actions.updateCancellationPolicy({
          propertyId,
          policyId,
          data,
        }),
      )
    },
    [propertyId, policyId, dispatch],
  )

  return { update, policy }
}

export const usePolicyOfNoShow = ({
  propertyId,
  policyId,
}: {
  propertyId: string
  policyId: string
}) => {
  const dispatch = useDispatch()

  const policy = useSelector((root: RootState) =>
    selectOnePolicyOfNoShow(selectVenueBranch(root), propertyId, policyId),
  )

  const update = useCallback(
    (data: Partial<Omit<PolicyOfNoShow, "id">>) => {
      dispatch(
        venueSlice.actions.updateNoSHowPolicy({ propertyId, policyId, data }),
      )
    },
    [propertyId, policyId, dispatch],
  )

  return { update, policy }
}
