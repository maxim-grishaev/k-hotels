import "@testing-library/jest-dom/extend-expect"
import { fireEvent, render, screen } from "@testing-library/react"
import { createTestStoreProvider } from "../Store/createTestStoreProvider"
import { createStore } from "../Store/store"
import { createPolicyCancellation } from "../Store/venue/mock"
import { venueSlice } from "../Store/venue/venueSlice"
import { RowForPolicyOfNoShow } from "./RowForPolicyOfNoShow"

describe("RowForPolicyOfCancellation", () => {
  it("should render", () => {
    const pol = createPolicyCancellation("1")
    render(
      <RowForPolicyOfNoShow propertyId="1" policy={pol} currency="USD" />,
      { wrapper: createTestStoreProvider() },
    )
    expect(screen.getByText(pol.name)).toBeInTheDocument()
    expect(screen.getByText(pol.description)).toBeInTheDocument()
    expect(screen.getByRole("spinbutton", { name: "Cost" })).toBeInTheDocument()
  })

  it("should render edit", async () => {
    const store = createStore()
    const spyDispatch = jest.spyOn(store, "dispatch")
    const pol = createPolicyCancellation("1")
    const view = render(
      <RowForPolicyOfNoShow propertyId="1" policy={pol} currency="USD" />,
      { wrapper: createTestStoreProvider(store) },
    )

    const costInput = screen.getByRole("spinbutton", { name: "Cost" })
    expect(costInput).toBeInTheDocument()

    fireEvent.change(costInput, { target: { value: "20" } })
    // Emulate store update
    pol.amount = 20
    view.rerender(
      <RowForPolicyOfNoShow propertyId="1" policy={pol} currency="USD" />,
    )

    expect(costInput).toHaveValue(20)
    expect(spyDispatch).toHaveBeenCalledTimes(1)
    expect(spyDispatch).toHaveBeenCalledWith(
      venueSlice.actions.updateNoSHowPolicy({
        propertyId: "1",
        policyId: "1",
        data: { amount: 20 },
      }),
    )
  })
})
