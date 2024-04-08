import { act, renderHook } from "@testing-library/react"
import { createTestStoreProvider } from "../Store/createTestStoreProvider"
import { createStore } from "../Store/store"
import {
  createPolicyCancellation,
  createPolicyNoShow,
  createVenue,
} from "../Store/venue/mock"
import { venueSlice } from "../Store/venue/venueSlice"
import { usePolicyEditor } from "./usePolicyEditor"

describe("usePolicyEditor", () => {
  it("should return the correct values", () => {
    const store = createStore()

    const ven = createVenue("1")
    const pol = createPolicyCancellation("2")
    ven.policies.noShowPolicies.push(createPolicyNoShow("3"))
    ven.policies.cancellationPolicies.push(pol)
    store.dispatch(venueSlice.actions.success([ven]))

    const view = renderHook(
      () => usePolicyEditor({ propertyId: "1", policy: pol }),
      { wrapper: createTestStoreProvider(store) },
    )

    expect(view.result.current.isEditing).toBe(false)
    expect(view.result.current.editedPolicy).toEqual(pol)
    expect(view.result.current.editedPolicy).not.toBe(pol)

    act(() => {
      view.result.current.edit()
      view.result.current.onChange({ amount: 42 })
    })

    expect(view.result.current.isEditing).toBe(true)
    expect(view.result.current.editedPolicy.amount).toBe(42)
    const storedPolicyV1 =
      store.getState().venues.venues.entities["1"]?.policies
        .cancellationPolicies[0]
    expect(storedPolicyV1?.amount).toEqual(0)

    act(() => {
      view.result.current.save()
    })

    expect(view.result.current.isEditing).toBe(false)
    const storedPolicyV2 =
      store.getState().venues.venues.entities["1"]?.policies
        .cancellationPolicies[0]
    expect(storedPolicyV2?.amount).toEqual(42)
  })
})
