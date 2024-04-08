import "@testing-library/jest-dom/extend-expect"
import { render, screen } from "@testing-library/react"
import { createTestStoreProvider } from "../Store/createTestStoreProvider"
import { createStore } from "../Store/store"
import { PolicyOfCancellation, PolicyOfNoShow } from "../Store/venue/fetchData"
import {
  createPolicyCancellation,
  createPolicyNoShow,
  createVenue,
} from "../Store/venue/mock"
import { venueSlice } from "../Store/venue/venueSlice"
import { PoliciesSection } from "./PoliciesSection"

const createPopulatedStore = (
  pid: string,
  props: {
    noShow: PolicyOfNoShow[]
    cancellation: PolicyOfCancellation[]
  },
) => {
  const store = createStore()
  const ven = createVenue(pid)
  ven.policies.noShowPolicies = props.noShow
  ven.policies.cancellationPolicies = props.cancellation
  store.dispatch(venueSlice.actions.success([ven]))
  return store
}

describe("PoliciesSection", () => {
  it("should render", () => {
    render(<PoliciesSection propertyId="bad-id" />, {
      wrapper: createTestStoreProvider(),
    })
  })

  it("should render no show policies", () => {
    const store = createPopulatedStore("p1", {
      noShow: [createPolicyNoShow("NS1"), createPolicyNoShow("NS2")],
      cancellation: [],
    })
    render(<PoliciesSection propertyId="p1" />, {
      wrapper: createTestStoreProvider(store),
    })
    expect(screen.getByText("name NS1")).toBeInTheDocument()
    expect(screen.getByText("name NS2")).toBeInTheDocument()
  })

  it("should render cancellation policies", () => {
    const store = createPopulatedStore("p2", {
      noShow: [],
      cancellation: [
        createPolicyCancellation("CC1"),
        createPolicyCancellation("CC2"),
      ],
    })
    render(<PoliciesSection propertyId="p2" />, {
      wrapper: createTestStoreProvider(store),
    })
    expect(screen.getByText("name CC1")).toBeInTheDocument()
    expect(screen.getByText("name CC2")).toBeInTheDocument()
  })
})
