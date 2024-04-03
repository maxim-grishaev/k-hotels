import { venueAdapter } from "./venueAdapter"
import { VenueState } from "./venueSlice"

const selectAdapterBranch = (state: VenueState) => state.venues

export const selectAllProperties =
  venueAdapter.getSelectors(selectAdapterBranch).selectAll

export const selectOneVenue =
  venueAdapter.getSelectors(selectAdapterBranch).selectById

export const selectOneProperty = (state: VenueState, propertyId?: string) => {
  if (propertyId === undefined) {
    return undefined
  }
  const venue = selectOneVenue(state, propertyId)
  if (venue === undefined) {
    return undefined
  }
  return venue.property
}
