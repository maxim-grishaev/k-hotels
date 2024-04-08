import { render } from "@testing-library/react"
import { createTestStoreProvider } from "../Store/createTestStoreProvider"
import { createProperty } from "../Store/venue/mock"
import { PropertySection } from "./PropertySection"

describe("PropertySection", () => {
  it("should render", () => {
    const property = createProperty("1")
    render(<PropertySection property={property} />, {
      wrapper: createTestStoreProvider(),
    })
  })
})
