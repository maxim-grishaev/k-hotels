import "@testing-library/jest-dom/extend-expect"
import { act, fireEvent, render, screen } from "@testing-library/react"
import { createTestStoreProvider } from "../Store/createTestStoreProvider"
import { createStore } from "../Store/store"
import { createPolicyCancellation, populateVenue } from "../Store/venue/mock"
import { venueSlice } from "../Store/venue/venueSlice"
import {
  RowForPolicyOfCancellation,
  RowForPolicyOfCancellationUI,
} from "./RowForPolicyOfCancellation"

describe("RowForPolicyOfCancellation", () => {
  it("should render", () => {
    const store = createStore()

    const ven = populateVenue({
      propertyId: "p1",
      policyCancellationId: "c1",
    })
    store.dispatch(venueSlice.actions.success([ven]))

    render(
      <RowForPolicyOfCancellation
        propertyId="p1"
        policyId="c1"
        currency="USD"
      />,
      { wrapper: createTestStoreProvider() },
    )
  })

  it("should bail out if there is no policy", () => {
    const store = createStore()

    render(
      <RowForPolicyOfCancellation
        propertyId="p1"
        policyId="c1"
        currency="USD"
      />,
      { wrapper: createTestStoreProvider(store) },
    )
    expect(
      screen.getByText("Policy with id c1 is not found"),
    ).toBeInTheDocument()
  })
})

describe("RowForPolicyOfCancellationUI", () => {
  it("should render", () => {
    const pol = createPolicyCancellation("1")
    render(
      <RowForPolicyOfCancellationUI
        policy={pol}
        currency="USD"
        onSave={jest.fn()}
      />,
      { wrapper: createTestStoreProvider() },
    )
    expect(screen.getByText(pol.name)).toBeInTheDocument()
    expect(screen.getByText(pol.description)).toBeInTheDocument()

    expect(screen.getByText("Edit")).toBeInTheDocument()
  })

  it("should render edit", () => {
    render(
      <RowForPolicyOfCancellationUI
        policy={createPolicyCancellation("1")}
        currency="USD"
        onSave={jest.fn()}
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
    const mockSave = jest.fn()

    render(
      <RowForPolicyOfCancellationUI
        policy={createPolicyCancellation("1")}
        currency="USD"
        onSave={mockSave}
      />,
      { wrapper: createTestStoreProvider() },
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

    expect(mockSave).toHaveBeenCalledTimes(1)
    expect(mockSave).toHaveBeenCalledWith(
      expect.objectContaining({ days: 7, hours: 12 }),
    )
  })

  it("should call the reset handler", () => {
    const mockSave = jest.fn()
    render(
      <RowForPolicyOfCancellationUI
        policy={createPolicyCancellation("1")}
        currency="USD"
        onSave={mockSave}
      />,
      { wrapper: createTestStoreProvider() },
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

    expect(mockSave).toHaveBeenCalledTimes(0)
  })
})
