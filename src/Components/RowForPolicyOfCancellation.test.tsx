import "@testing-library/jest-dom/extend-expect"
import { act, fireEvent, render, screen } from "@testing-library/react"
import { createTestStoreProvider } from "../Store/createTestStoreProvider"
import { createStore } from "../Store/store"
import { createPolicyCancellation } from "../Store/venue/mock"
import { venueSlice } from "../Store/venue/venueSlice"
import { RowForPolicyOfCancellation } from "./RowForPolicyOfCancellation"

describe("RowForPolicyOfCancellation", () => {
  it("should render", () => {
    const pol = createPolicyCancellation("1")
    render(
      <RowForPolicyOfCancellation propertyId="1" policy={pol} currency="USD" />,
      { wrapper: createTestStoreProvider() },
    )
    expect(screen.getByText(pol.name)).toBeInTheDocument()
    expect(screen.getByText(pol.description)).toBeInTheDocument()

    expect(screen.getByText("Edit")).toBeInTheDocument()
  })

  it("should render edit", () => {
    render(
      <RowForPolicyOfCancellation
        propertyId="1"
        policy={createPolicyCancellation("1")}
        currency="USD"
      />,
      { wrapper: createTestStoreProvider() },
    )
    const btnEdit = screen.getByRole("button", { name: "Edit" })
    act(() => {
      btnEdit.click()
    })

    const btnRst = screen.getByRole("button", { name: "Reset" })
    expect(btnRst).toBeInTheDocument()

    const btnSave = screen.getByRole("button", { name: "Save" })
    expect(btnSave).toBeInTheDocument()

    expect(screen.getByRole("spinbutton", { name: "Cost" })).toBeInTheDocument()
    expect(screen.getByRole("spinbutton", { name: "Days" })).toBeInTheDocument()
    expect(
      screen.getByRole("spinbutton", { name: "Hours" }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole("combobox", { name: "Reference" }),
    ).toBeInTheDocument()
  })

  it("should call the save handler", () => {
    const store = createStore()
    const spyDispatch = jest.spyOn(store, "dispatch")

    render(
      <RowForPolicyOfCancellation
        propertyId="1"
        policy={createPolicyCancellation("1")}
        currency="USD"
      />,
      { wrapper: createTestStoreProvider(store) },
    )
    const btnEdit = screen.getByRole("button", { name: "Edit" })
    act(() => {
      btnEdit.click()
    })

    const btnSave = screen.getByRole("button", { name: "Save" })
    const daysInput = screen.getByRole("spinbutton", { name: "Days" })
    const hoursInput = screen.getByRole("spinbutton", { name: "Hours" })
    fireEvent.change(daysInput, { target: { value: "7" } })
    fireEvent.change(hoursInput, { target: { value: "12" } })
    act(() => {
      btnSave.click()
    })

    expect(spyDispatch).toHaveBeenCalledTimes(1)
    expect(spyDispatch).toHaveBeenCalledWith(
      venueSlice.actions.updateCancellationPolicy({
        propertyId: "1",
        policyId: "1",
        data: expect.objectContaining({ days: 7, hours: 12 }),
      }),
    )
  })

  it("should call the reset handler", () => {
    const store = createStore()
    const spyDispatch = jest.spyOn(store, "dispatch")

    render(
      <RowForPolicyOfCancellation
        propertyId="1"
        policy={createPolicyCancellation("1")}
        currency="USD"
      />,
      { wrapper: createTestStoreProvider(store) },
    )
    const btnEdit = screen.getByRole("button", { name: "Edit" })
    act(() => {
      btnEdit.click()
    })

    const btnRst = screen.getByRole("button", { name: "Reset" })
    const daysInput = screen.getByRole("spinbutton", { name: "Days" })
    fireEvent.change(daysInput, { target: { value: "69" } })
    act(() => {
      btnRst.click()
    })

    expect(spyDispatch).toHaveBeenCalledTimes(0)
  })
})
