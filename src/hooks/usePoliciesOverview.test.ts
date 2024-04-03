import { renderHook } from "@testing-library/react"
import { createTestStoreProvider } from "../Store/createTestStoreProvider"
import { createStore } from "../Store/store"
import {
  createPolicyCancellation,
  createPolicyNoShow,
  populateVenue,
} from "../Store/venue/mock"
import { venueSlice } from "../Store/venue/venueSlice"
import { usePoliciesOverview } from "./usePoliciesOverview"

describe("usePolicyIDs", () => {
  it("should return empty arrays and empty string", () => {
    const view = renderHook(() => usePoliciesOverview("p1"), {
      wrapper: createTestStoreProvider(),
    })
    expect(view.result.current).toEqual({
      noShow: [],
      cancellation: [],
      currency: "",
    })
  })

  it("should return populated arrays and currency", () => {
    const store = createStore()
    const ven = populateVenue({
      propertyId: "prop",
      policyCancellationId: "c1",
      policyNoShowId: "ns1",
    })
    ven.policies.noShowPolicies.push(createPolicyNoShow("ns2"))
    ven.policies.cancellationPolicies.push(createPolicyCancellation("c2"))
    store.dispatch(venueSlice.actions.success([ven]))

    const view = renderHook(() => usePoliciesOverview("prop"), {
      wrapper: createTestStoreProvider(store),
    })

    expect(view.result.current).toEqual({
      noShow: ["ns1", "ns2"],
      cancellation: ["c1", "c2"],
      currency: ven.property.currency,
    })
  })
})
