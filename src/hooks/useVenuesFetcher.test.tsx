import { renderHook } from "@testing-library/react"
import { createTestStoreWrapper } from "../Store/createTestStoreWrapper"
import { createStore } from "../Store/store"
import * as api from "../Store/venue/fetchData"
import { venueSlice } from "../Store/venue/venueSlice"
import { useVenuesFetcher } from "./useVenuesFetcher"

const mockFetch = jest.spyOn(api, "fetchData")

describe("useVenuesFetcher", () => {
  it("should call the requestStart action", async () => {
    jest.useFakeTimers()
    mockFetch.mockResolvedValue([])
    const store = createStore()
    const mockDispatch = jest.spyOn(store, "dispatch")
    renderHook(() => useVenuesFetcher(), {
      wrapper: createTestStoreWrapper(store),
    })
    expect(mockDispatch).toHaveBeenCalledWith({
      type: venueSlice.actions.requestStart.type,
    })
  })
})
