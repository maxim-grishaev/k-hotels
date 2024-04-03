import { createEntityAdapter } from "@reduxjs/toolkit"
import { Venue } from "./fetchData"

export const venueAdapter = createEntityAdapter({
  selectId: (item: Venue) => item.property.id,
})
