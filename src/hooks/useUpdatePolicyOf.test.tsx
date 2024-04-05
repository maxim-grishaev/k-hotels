import { act, renderHook } from "@testing-library/react"
import { createTestStoreWrapper } from "../Store/createTestStoreWrapper"
import { createStore } from "../Store/store"
import { populateVenue } from "../Store/venue/mock"
import {
  selectOneCancellationPolicy,
  selectOneNoSHowPolicy,
} from "../Store/venue/selectors"
import { venueSlice } from "../Store/venue/venueSlice"
import {
  useUpdatePolicyOfCancellation,
  useUpdatePolicyOfNoShow,
} from "./useUpdatePolicyOf"

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
        useUpdatePolicyOfNoShow({
          propertyId,
          policyId: policyNoShowId,
        }),
      { wrapper: createTestStoreWrapper(store) },
    )

    expect(view.result.current).toEqual(expect.any(Function))

    act(() => {
      view.result.current({ amount: 42 })
    })

    const nsp = selectOneNoSHowPolicy(
      store.getState().venues,
      propertyId,
      policyNoShowId,
    )
    expect(nsp?.amount).toEqual(42)
  })

  it("usePolicyCancellationCallback", async () => {
    const view = renderHook(
      () =>
        useUpdatePolicyOfCancellation({
          propertyId,
          policyId: policyCancellationId,
        }),
      { wrapper: createTestStoreWrapper(store) },
    )

    expect(view.result.current).toEqual(expect.any(Function))

    act(() => {
      view.result.current({ amount: 1337, days: 2 })
    })

    const cp = selectOneCancellationPolicy(
      store.getState().venues,
      propertyId,
      policyCancellationId,
    )
    expect(cp?.amount).toEqual(1337)
    expect(cp?.days).toEqual(2)
  })
})
