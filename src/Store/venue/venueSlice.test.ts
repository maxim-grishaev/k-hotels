import { Venue } from "./fetchData"
import {
  createPolicyCancellation,
  createPolicyNoSHow,
  createVenue,
} from "./mock"
import { selectOneVenue } from "./selectors"
import { venueAdapter } from "./venueAdapter"
import { venueSlice } from "./venueSlice"

describe("venueSlice", () => {
  it("should create an action to request properties", () => {
    const state2 = venueSlice.reducer(
      {
        loading: false,
        error: null,
        venues: venueAdapter.getInitialState(),
      },
      venueSlice.actions.requestStart(),
    )
    expect(state2.loading).toBe(true)

    const state3 = venueSlice.reducer(state2, venueSlice.actions.success([]))
    expect(state3.loading).toBe(false)
  })

  it("should set the error state", () => {
    const state = venueSlice.reducer(
      {
        loading: true,
        error: null,
        venues: venueAdapter.getInitialState(),
      },
      venueSlice.actions.error("error"),
    )
    expect(state.error).toBe("error")
    expect(state.loading).toBe(false)
  })

  it("should set the policy value", () => {
    let venState = venueAdapter.getInitialState()
    const ven: Venue = createVenue("1")
    ven.policies.noShowPolicies.push(createPolicyNoSHow("1"))
    ven.policies.cancellationPolicies.push(createPolicyCancellation("1"))
    const state = venueSlice.reducer(
      {
        loading: false,
        error: null,
        venues: venueAdapter.addOne(venState, ven),
      },
      venueSlice.actions.updateNoSHowPolicy({
        propertyId: "1",
        policyId: "1",
        data: { amount: 42 },
      }),
    )
    const venue = selectOneVenue(state, "1")
    expect(venue).toBeDefined()
    expect(venue?.policies.noShowPolicies[0].amount).toBe(42)
    expect(venue?.policies.cancellationPolicies[0].amount).toBe(0)

    const state2 = venueSlice.reducer(
      state,
      venueSlice.actions.updateCancellationPolicy({
        propertyId: "1",
        policyId: "1",
        data: { amount: 1337 },
      }),
    )
    const venue2 = selectOneVenue(state2, "1")
    expect(venue2).toBeDefined()
    expect(venue2?.policies.noShowPolicies[0].amount).toBe(42)
    expect(venue2?.policies.cancellationPolicies[0].amount).toBe(1337)
  })
})
