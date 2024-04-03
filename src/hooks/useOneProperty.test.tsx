import { renderHook } from "@testing-library/react"
import { createTestStoreProvider } from "../Store/createTestStoreProvider"
import { createStore } from "../Store/store"
import { populateVenue } from "../Store/venue/mock"
import { venueSlice } from "../Store/venue/venueSlice"
import { useOneProperty } from "./useOneProperty"

describe("useOneVenue", () => {
  it("should return undefined if item does not exist", () => {
    const view = renderHook(() => useOneProperty("1"), {
      wrapper: createTestStoreProvider(),
    })
    expect(view.result.current).toBeUndefined()
  })

  it("should return the venue with the provided id", () => {
    const store = createStore()
    const v1 = populateVenue({
      propertyId: "p-bad",
      policyCancellationId: "c1",
      policyNoShowId: "n1",
    })
    const v2 = populateVenue({
      propertyId: "p-good",
      policyCancellationId: "c2",
      policyNoShowId: "n2",
    })
    v2.property.name = "found me!"
    store.dispatch(venueSlice.actions.success([v1, v2]))

    const view = renderHook(() => useOneProperty("p-good"), {
      wrapper: createTestStoreProvider(store),
    })
    expect(view.result.current?.name).toEqual("found me!")
  })
})
