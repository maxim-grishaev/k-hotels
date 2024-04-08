import "@testing-library/jest-dom/extend-expect"
import { polyfillMathcMedia } from "../lib/testPolyfill.matchMedia"
import { testRenderWithRouter } from "../Router/testRenderWithRouter"
import { createStore } from "../Store/store"
import { populateVenue } from "../Store/venue/mock"
import { venueSlice } from "../Store/venue/venueSlice"
import { VenuesListPage } from "./VenuesListPage"

polyfillMathcMedia()

describe("VenuesListPage", () => {
  it("should render with empty store", async () => {
    await testRenderWithRouter(<VenuesListPage />, {
      store: createStore(),
    })
  })

  it("should render with item", async () => {
    const store = createStore()
    const ven = populateVenue()
    store.dispatch(venueSlice.actions.success([ven]))

    await testRenderWithRouter(<VenuesListPage />, { store })
  })
})
