import "@testing-library/jest-dom/extend-expect"
import { screen } from "@testing-library/react"
import { polyfillMathcMedia } from "../lib/testPolyfill.matchMedia"
import { testRenderWithRouter } from "../Router/testRenderWithRouter"
import { createProperty } from "../Store/venue/mock"
import { PropertiesTable } from "./PropertiesTable"

beforeAll(() => {
  polyfillMathcMedia()
})

describe("PropertiesTable", () => {
  it("should render empty list", async () => {
    await testRenderWithRouter(<PropertiesTable properties={[]} />)
  })

  it("should render items", async () => {
    const properties = [createProperty("1"), createProperty("2")]
    await testRenderWithRouter(<PropertiesTable properties={properties} />)
    properties.forEach((p) => {
      expect(screen.getByText(p.name)).toBeInTheDocument()
      expect(screen.getByText(p.description)).toBeInTheDocument()
    })
  })
})
