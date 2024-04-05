import { renderHook } from "@testing-library/react"
import { createTestStoreWrapper } from "../Store/createTestStoreWrapper"
import { createStore } from "../Store/store"
import { populateVenue } from "../Store/venue/mock"
import { venueSlice } from "../Store/venue/venueSlice"
import { useAllProperties } from "./useAllProperties"

describe("useAllProperties", () => {
  it("should return empty array if not populated", () => {
    const store = createStore()
    const view = renderHook(() => useAllProperties(), {
      wrapper: createTestStoreWrapper(store),
    })
    expect(view.result.current).toEqual([])
  })

  it("should return all properties", () => {
    const store = createStore()
    const v1 = populateVenue({
      propertyId: "pId_1",
      policyCancellationId: "cId",
      policyNoShowId: "nsId",
    })
    const v2 = populateVenue({
      propertyId: "pId_2",
      policyCancellationId: "cId2",
      policyNoShowId: "nsId2",
    })
    store.dispatch(venueSlice.actions.success([v1, v2]))

    const view = renderHook(() => useAllProperties(), {
      wrapper: createTestStoreWrapper(store),
    })
    expect(view.result.current.map((v) => v.id)).toEqual(["pId_1", "pId_2"])
  })
})
