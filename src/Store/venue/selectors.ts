import { venueAdapter, VenueState } from "./venueSlice"

const selectAdapterBranch = (state: VenueState) => state.venues

export const selectAllProperties =
  venueAdapter.getSelectors(selectAdapterBranch).selectAll

export const selectOneVenue =
  venueAdapter.getSelectors(selectAdapterBranch).selectById

export const selectOneProperty = (state: VenueState, propertyId: string) => {
  const venue = selectOneVenue(state, propertyId)
  return venue ? venue.property : undefined
}

export const selectOneNoSHowPolicy = (
  state: VenueState,
  propertyId: string,
  policyId: string,
) => {
  const venue = selectOneVenue(state, propertyId)
  if (venue === undefined) {
    return undefined
  }
  return venue.policies.noShowPolicies.find((p) => p.id === policyId)
}

export const selectOneCancellationPolicy = (
  state: VenueState,
  propertyId: string,
  policyId: string,
) => {
  const venue = selectOneVenue(state, propertyId)
  if (venue === undefined) {
    return undefined
  }
  return venue.policies.cancellationPolicies.find((p) => p.id === policyId)
}
