import { renderHook } from "@testing-library/react"
import { createTestStoreWrapper } from "../Store/createTestStoreWrapper"
import { createStore } from "../Store/store"
import { populateVenue } from "../Store/venue/mock"
import { venueSlice } from "../Store/venue/venueSlice"
import { useOneVenue } from "./useOneVenue"

describe("useOneVenue", () => {
  it("should return undefined if item does not exist", () => {
    const view = renderHook(() => useOneVenue("1"), {
      wrapper: createTestStoreWrapper(),
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

    const view = renderHook(() => useOneVenue("p-good"), {
      wrapper: createTestStoreWrapper(store),
    })
    expect(view.result.current?.property.name).toEqual("found me!")
  })
})
