import {
  PayloadAction,
  createSlice,
  createEntityAdapter,
} from "@reduxjs/toolkit"
import { PolicyOfCancellation, PolicyOfNoShow, Venue } from "./fetchData"

export const venueAdapter = createEntityAdapter({
  selectId: (item: Venue) => item.property.id,
})

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
        data: Omit<Partial<PolicyOfNoShow>, "id">
      }>,
    ) => {
      const { data, policyId, propertyId } = action.payload
      const venue = state.venues.entities[propertyId]
      if (!venue) {
        return
      }
      const policy = venue.policies.noShowPolicies.find(
        (p) => p.id === policyId,
      )
      if (!policy) {
        return
      }
      Object.assign(policy, data)
    },

    updateCancellationPolicy: (
      state,
      action: PayloadAction<{
        propertyId: string
        policyId: string
        data: Omit<Partial<PolicyOfCancellation>, "id">
      }>,
    ) => {
      const { policyId, propertyId, data } = action.payload
      const venue = state.venues.entities[propertyId]
      if (!venue) {
        return
      }
      const policy = venue.policies.cancellationPolicies.find(
        (p) => p.id === policyId,
      )
      if (!policy) {
        return
      }
      Object.assign(policy, data)
    },
  },
})
