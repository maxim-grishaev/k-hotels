import { selectOneVenue } from "./venue/selectors"
import { RootState } from "./store"

export const selectVenueBranch = (state: RootState) => state.venues

export const selectOneVenueByRoot = (
  state: RootState,
  propertyId: string | undefined,
) =>
  propertyId === undefined
    ? undefined
    : selectOneVenue(selectVenueBranch(state), propertyId)

export const selectVenuesLoadingState = (state: RootState) =>
  state.venues.loading
