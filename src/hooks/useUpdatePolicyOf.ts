import { useCallback } from "react"
import { useDispatch } from "react-redux"
import { PolicyOfCancellation, PolicyOfNoShow } from "../Store/venue/fetchData"
import { venueSlice } from "../Store/venue/venueSlice"

export const useUpdatePolicyOfCancellation = ({
  propertyId,
  policyId,
}: {
  propertyId: string
  policyId: string
}) => {
  const dispatch = useDispatch()

  return useCallback(
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
}

export const useUpdatePolicyOfNoShow = ({
  propertyId,
  policyId,
}: {
  propertyId: string
  policyId: string
}) => {
  const dispatch = useDispatch()

  return useCallback(
    (data: Partial<Omit<PolicyOfNoShow, "id">>) => {
      dispatch(
        venueSlice.actions.updateNoSHowPolicy({ propertyId, policyId, data }),
      )
    },
    [propertyId, policyId, dispatch],
  )
}
