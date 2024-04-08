import "@testing-library/jest-dom/extend-expect"
import { screen } from "@testing-library/react"
import { testRenderWithRouter } from "../Router/testRenderWithRouter"
import { createStore } from "../Store/store"
import { populateVenue } from "../Store/venue/mock"
import { venueSlice } from "../Store/venue/venueSlice"
import { VenuePage } from "./VenuePage"

describe("VenuePage", () => {
  it("should render with empty store", async () => {
    await testRenderWithRouter(<VenuePage id="1" />, {
      store: createStore(),
    })
    expect(screen.getByText("Not found")).toBeInTheDocument()
  })

  it("should render with item", async () => {
    const store = createStore()
    const ven = populateVenue({
      propertyId: "p1",
      policyCancellationId: "c1",
      policyNoShowId: "ns1",
    })
    store.dispatch(venueSlice.actions.success([ven]))

    await testRenderWithRouter(<VenuePage id="p1" />, { store })

    expect(screen.getByText("property p1")).toBeInTheDocument()
  })
})
