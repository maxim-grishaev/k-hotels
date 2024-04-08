import { venueAdapter } from "./venueAdapter"
import { Venue } from "./fetchData"
import { VenueState } from "./venueSlice"

const selectAdapterBranch = (state: VenueState) => state.venues

export const selectAllProperties =
  venueAdapter.getSelectors(selectAdapterBranch).selectAll

export const selectOneVenue =
  venueAdapter.getSelectors(selectAdapterBranch).selectById

export const selectOneProperty = (state: VenueState, propertyId: string) => {
  const venue = selectOneVenue(state, propertyId)
  return venue ? venue.property : undefined
}

export const selectOnePolicyOfNoShow = (
  state: VenueState,
  propertyId: string,
  policyId: string,
) => {
  const venue = selectOneVenue(state, propertyId)
  return pickOnePolicyOfNoShow(venue, policyId)
}

export const selectOnePolicyOfCancellation = (
  state: VenueState,
  propertyId: string,
  policyId: string,
) => {
  const venue = selectOneVenue(state, propertyId)
  return pickOnePolicyOfCancellation(venue, policyId)
}

export const pickOnePolicyOfNoShow = (
  venue: Venue | undefined,
  policyId: string,
) =>
  !venue
    ? undefined
    : venue.policies.noShowPolicies.find((p) => p.id === policyId)

export const pickOnePolicyOfCancellation = (
  venue: Venue | undefined,
  policyId: string,
) =>
  !venue
    ? undefined
    : venue.policies.cancellationPolicies.find((p) => p.id === policyId)
