import "@testing-library/jest-dom/extend-expect"
import { render, screen } from "@testing-library/react"
import { createTestStoreWrapper } from "../Store/createTestStoreWrapper"
import {
  createPolicyNoShow,
  createPolicyCancellation,
} from "../Store/venue/mock"
import { PoliciesSection } from "./PoliciesSection"

describe("PoliciesSection", () => {
  it("should render", () => {
    render(
      <PoliciesSection
        propertyId="1"
        currency="USD"
        noShowPolicies={[]}
        cancellationPolicies={[]}
      />,
    )
  })

  it("should render no show policies", () => {
    render(
      <PoliciesSection
        propertyId="1"
        currency="USD"
        noShowPolicies={[createPolicyNoShow("NS")]}
        cancellationPolicies={[]}
      />,
      { wrapper: createTestStoreWrapper() },
    )
    expect(screen.getByText("name NS")).toBeInTheDocument()
  })

  it("should render cancellation policies", () => {
    render(
      <PoliciesSection
        propertyId="1"
        currency="USD"
        noShowPolicies={[]}
        cancellationPolicies={[createPolicyCancellation("CC")]}
      />,
      { wrapper: createTestStoreWrapper() },
    )
    expect(screen.getByText("name CC")).toBeInTheDocument()
  })
})
