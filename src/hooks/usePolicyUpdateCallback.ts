import { useCallback } from "react"
import { useDispatch } from "react-redux"
import { PolicyCancellation, PolicyNoShow } from "../Store/venue/fetchData"
import { venueSlice } from "../Store/venue/venueSlice"

export const usePolicyCancellationCallback = ({
  propertyId,
  policyId,
}: {
  propertyId: string
  policyId: string
}) => {
  const dispatch = useDispatch()

  return useCallback(
    (data: Partial<Omit<PolicyCancellation, "id">>) => {
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
}

export const usePolicyNoSHowCallback = ({
  propertyId,
  policyId,
}: {
  propertyId: string
  policyId: string
}) => {
  const dispatch = useDispatch()

  return useCallback(
    (data: Partial<Omit<PolicyNoShow, "id">>) => {
      dispatch(
        venueSlice.actions.updateNoSHowPolicy({ propertyId, policyId, data }),
      )
    },
    [propertyId, policyId, dispatch],
  )
}
