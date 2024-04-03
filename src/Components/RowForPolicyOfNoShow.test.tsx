import "@testing-library/jest-dom/extend-expect"
import { fireEvent, render, screen } from "@testing-library/react"
import { createTestStoreProvider } from "../Store/createTestStoreProvider"
import { createStore } from "../Store/store"
import { createPolicyNoShow, createVenue } from "../Store/venue/mock"
import { venueSlice } from "../Store/venue/venueSlice"
import { RowForPolicyOfNoShow } from "./RowForPolicyOfNoShow"

const createPopulatedStore = (pid: string, nsid: string) => {
  const store = createStore()
  const ven = createVenue(pid)
  const policy = createPolicyNoShow(nsid)
  ven.policies.noShowPolicies = [policy]
  store.dispatch(venueSlice.actions.success([ven]))
  const spyDispatch = jest.spyOn(store, "dispatch")
  return { store, spyDispatch, policy }
}

describe("RowForPolicyOfCancellation", () => {
  it("should render empty", () => {
    render(
      <RowForPolicyOfNoShow propertyId="p1" policyId="ns1" currency="USD" />,
      { wrapper: createTestStoreProvider() },
    )
  })

  it("should render item", async () => {
    const { policy, store } = createPopulatedStore("p2", "ns2")
    render(
      <RowForPolicyOfNoShow propertyId="p2" policyId="ns2" currency="USD" />,
      { wrapper: createTestStoreProvider(store) },
    )
    expect(screen.getByText(policy.name)).toBeInTheDocument()
    expect(screen.getByText(policy.description)).toBeInTheDocument()
    expect(screen.getByRole("spinbutton", { name: "Cost" })).toBeInTheDocument()
  })

  it("should render edit", async () => {
    const { store, spyDispatch } = createPopulatedStore("p3", "ns3")
    const view = render(
      <RowForPolicyOfNoShow propertyId="p3" policyId="ns3" currency="USD" />,
      { wrapper: createTestStoreProvider(store) },
    )

    const costInput = screen.getByRole("spinbutton", { name: "Cost" })
    expect(costInput).toBeInTheDocument()

    fireEvent.change(costInput, { target: { value: "20" } })
    view.rerender(
      <RowForPolicyOfNoShow propertyId="p1" policyId="ns1" currency="USD" />,
    )

    expect(costInput).toHaveValue(20)
    expect(spyDispatch).toHaveBeenCalledTimes(1)
    expect(spyDispatch).toHaveBeenCalledWith(
      venueSlice.actions.updateNoSHowPolicy({
        propertyId: "p3",
        policyId: "ns3",
        data: { amount: 20 },
      }),
    )
  })
})
