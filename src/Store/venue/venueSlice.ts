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
    success: (state, action: PayloadAction<Venue[]>) => {
      venueAdapter.addMany(state.venues, action.payload)
      state.loading = false
    },
    error: (state, action) => {
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
      const venue = state.venues.entities[propertyId]
      const policy = pickOnePolicyOfCancellation(venue, policyId)
      if (policy) {
        Object.assign(policy, data)
      }
    },
    setPolicyValue: (
      state,
      action: PayloadAction<{
        propertyId: string
        policyId: string
        amount: number
      }>,
    ) => {
      const { amount, policyId, propertyId } = action.payload
      const venue = state.venues.entities[propertyId]
      if (!venue) {
        return
      }
      const policy = venue.policies.noShowPolicies
        .concat(venue.policies.cancellationPolicies)
        .find((p) => p.id === policyId)
      if (!policy) {
        return
      }
      policy.amount = amount
    },
  },
})
