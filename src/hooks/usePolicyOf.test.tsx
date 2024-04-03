import { act, renderHook } from "@testing-library/react"
import { createTestStoreProvider } from "../Store/createTestStoreProvider"
import { createStore } from "../Store/store"
import { populateVenue } from "../Store/venue/mock"
import {
  selectOnePolicyOfCancellation,
  selectOnePolicyOfNoShow,
} from "../Store/venue/selectors"
import { venueSlice } from "../Store/venue/venueSlice"
import { usePolicyOfCancellation, usePolicyOfNoShow } from "./usePolicyOf"

describe("should update policy", () => {
  let store = createStore()
  const propertyId = "1"
  const policyCancellationId = "2"
  const policyNoShowId = "3"

  beforeEach(() => {
    store = createStore()
    const ven = populateVenue({
      propertyId,
      policyNoShowId,
      policyCancellationId,
    })

    store.dispatch(venueSlice.actions.success([ven]))
  })

  it("usePolicyNoSHowCallback", async () => {
    const view = renderHook(
      () =>
        usePolicyOfNoShow({
          propertyId,
          policyId: policyNoShowId,
        }),
      { wrapper: createTestStoreProvider(store) },
    )

    expect(view.result.current).toEqual({
      policy: expect.any(Object),
      update: expect.any(Function),
    })

    act(() => {
      view.result.current.update({ amount: 42 })
    })

    const nsp = selectOnePolicyOfNoShow(
      store.getState().venues,
      propertyId,
      policyNoShowId,
    )
    expect(nsp?.amount).toEqual(42)
  })

  it("usePolicyCancellationCallback", async () => {
    const view = renderHook(
      () =>
        usePolicyOfCancellation({
          propertyId,
          policyId: policyCancellationId,
        }),
      { wrapper: createTestStoreProvider(store) },
    )

    expect(view.result.current).toEqual({
      policy: expect.any(Object),
      update: expect.any(Function),
    })

    act(() => {
      view.result.current.update({ amount: 1337, days: 2 })
    })

    const cp = selectOnePolicyOfCancellation(
      store.getState().venues,
      propertyId,
      policyCancellationId,
    )
    expect(cp?.amount).toEqual(1337)
    expect(cp?.days).toEqual(2)
  })
})
