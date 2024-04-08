import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { venueAdapter } from "./venueAdapter"
import { PolicyOfCancellation, PolicyOfNoShow, Venue } from "./fetchData"
import { pickOnePolicyOfCancellation, pickOnePolicyOfNoShow } from "./selectors"

const initState = {
  loading: true,
  error: null as string | null,
  venues: venueAdapter.getInitialState(),
}

export type VenueState = typeof initState

export const venueSlice = createSlice({
  initialState: initState,
  name: "venues",
  reducers: {
    requestStart: (state) => {
      state.loading = true
    },
    // TODO: naming is a little bit confusing as it's not clear if we add or replace items
    success: (state, action: PayloadAction<Venue[]>) => {
      venueAdapter.addMany(state.venues, action.payload)
      state.loading = false
    },
    error: (state, action: PayloadAction<unknown>) => {
      state.error = String(action.payload)
      state.loading = false
    },

    updateNoSHowPolicy: (
      state,
      action: PayloadAction<{
        propertyId: string
        policyId: string
        data: Partial<PolicyOfNoShow>
      }>,
    ) => {
      const { data, policyId, propertyId } = action.payload
      if (data.id !== undefined && data.id !== policyId) {
        console.error("[updateNoSHowPolicy] id is not allowed to be changed")
        return
      }
      // Can't use selectOnePolicyOfNoShow here because it's not draft-safe
      // We need policy as mutative version to be able to use Object.assign
      const venue = state.venues.entities[propertyId]
      const policy = pickOnePolicyOfNoShow(venue, policyId)
      if (policy) {
        Object.assign(policy, data)
      }
    },

    updateCancellationPolicy: (
      state,
      action: PayloadAction<{
        propertyId: string
        policyId: string
        data: Partial<PolicyOfCancellation>
      }>,
    ) => {
      const { policyId, propertyId, data } = action.payload
      // Can't use selectOnePolicyOfCancellation here because it's not draft-safe
      // We need policy as mutative version to be able to use Object.assign
      const venue = state.venues.entities[propertyId]
      const policy = pickOnePolicyOfCancellation(venue, policyId)
      if (policy) {
        Object.assign(policy, data)
      }
    },
  },
})
