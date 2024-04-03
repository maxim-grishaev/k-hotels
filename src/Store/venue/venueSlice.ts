import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { Venue } from "./fetchData"
import { venueAdapter } from "./venueAdapter"

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
      state.loading = false
      state.error = String(action.payload)
    },
  },
})
