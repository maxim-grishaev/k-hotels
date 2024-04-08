import { populateVenue } from "./mock"
import {
  pickOnePolicyOfCancellation,
  pickOnePolicyOfNoShow,
  selectAllProperties,
  selectOnePolicyOfCancellation,
  selectOnePolicyOfNoShow,
  selectOneProperty,
} from "./selectors"
import { venueAdapter } from "./venueAdapter"

const createInitialState = () => {
  return {
    loading: true,
    error: null as string | null,
    venues: venueAdapter.addMany(venueAdapter.getInitialState(), [
      populateVenue({
        propertyId: "1",
        policyCancellationId: "cc1",
        policyNoShowId: "ns1",
      }),
      populateVenue({
        propertyId: "2",
        policyCancellationId: "cc2",
        policyNoShowId: "ns2",
      }),
    ]),
  }
}

describe("selectOneProperty", () => {
  it("should return property by id", () => {
    const state = createInitialState()
    const property = selectOneProperty(state, "1")
    expect(property).toBeDefined()
    expect(property?.id).toBe("1")
  })

  it("should return undefined if property is not found", () => {
    const state = createInitialState()
    const property = selectOneProperty(state, "3")
    expect(property).toBeUndefined()
  })
})

describe("selectOnePolicyOfNoShow", () => {
  it("should return policy by id", () => {
    const state = createInitialState()
    const policy = selectOnePolicyOfNoShow(state, "1", "ns1")
    expect(policy).toBeDefined()
    expect(policy?.id).toBe("ns1")
  })

  it("should return undefined if policy is not found", () => {
    const state = createInitialState()
    const policy = selectOnePolicyOfNoShow(state, "1", "ns3")
    expect(policy).toBeUndefined()
  })
})

describe("selectOnePolicyOfCancellation", () => {
  it("should return policy by id", () => {
    const state = createInitialState()
    const policy = selectOnePolicyOfCancellation(state, "1", "cc1")
    expect(policy).toBeDefined()
    expect(policy?.id).toBe("cc1")
  })

  it("should return undefined if policy is not found", () => {
    const state = createInitialState()
    const policy = selectOnePolicyOfCancellation(state, "1", "cc3")
    expect(policy).toBeUndefined()
  })
})

describe("selectAllProperties", () => {
  it("should return all properties", () => {
    const state = createInitialState()
    const properties = selectAllProperties(state)
    expect(properties).toHaveLength(2)
  })

  it("should return empty array if no properties", () => {
    const state = {
      loading: false,
      error: null,
      venues: venueAdapter.getInitialState(),
    }
    const properties = selectAllProperties(state)
    expect(properties).toHaveLength(0)
  })
})

describe("pickOnePolicyOfNoShow", () => {
  it("should return policy by id", () => {
    const venue = populateVenue({
      propertyId: "1",
      policyCancellationId: "cc1",
      policyNoShowId: "ns1",
    })
    const policy = pickOnePolicyOfNoShow(venue, "ns1")
    expect(policy).toBeDefined()
    expect(policy?.id).toBe("ns1")
  })
})

describe("pickOnePolicyOfCancellation", () => {
  it("should return policy by id", () => {
    const venue = populateVenue({
      propertyId: "1",
      policyCancellationId: "cc1",
      policyNoShowId: "ns1",
    })
    const policy = pickOnePolicyOfCancellation(venue, "cc1")
    expect(policy).toBeDefined()
    expect(policy?.id).toBe("cc1")
  })
})
