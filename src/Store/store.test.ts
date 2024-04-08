import { createStore } from "./store"
import { venueSlice } from "./venue/venueSlice"
import * as api from "./venue/fetchData"

beforeEach(() => {
  jest.restoreAllMocks()
})

describe("store", () => {
  it("should create a store", async () => {
    const store = createStore()

    const mockFetch = jest.spyOn(api, "fetchData").mockResolvedValue([])
    store.dispatch(venueSlice.actions.requestStart())

    expect(mockFetch).toHaveBeenCalled()
    mockFetch.mockRestore()
    expect(store.getState().venues.loading).toBe(true)
    expect(store.getState().venues.error).toBe(null)

    await Promise.resolve()

    expect(store.getState().venues.loading).toBe(false)
    expect(store.getState().venues.error).toBe(null)
  })

  it("should handle error", async () => {
    const store = createStore()

    const mockFetch = jest
      .spyOn(api, "fetchData")
      .mockRejectedValue(new Error("test"))
    store.dispatch(venueSlice.actions.requestStart())

    expect(mockFetch).toHaveBeenCalled()
    mockFetch.mockRestore()
    expect(store.getState().venues.loading).toBe(true)
    expect(store.getState().venues.error).toBe(null)

    await Promise.resolve()

    expect(store.getState().venues.loading).toBe(false)
    expect(store.getState().venues.error).toBe("Error: test")
  })
})
