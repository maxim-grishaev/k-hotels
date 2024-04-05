import "@testing-library/jest-dom/extend-expect"
import { render, screen } from "@testing-library/react"
import { ASectionWithTitle } from "./ASectionWithTitile"

describe("ASectionWithTitle", () => {
  it("should render", () => {
    render(<ASectionWithTitle title="abc">123</ASectionWithTitle>)
    expect(screen.getByText("abc")).toBeInTheDocument()
    expect(screen.getByText("123")).toBeInTheDocument()
  })
})
