import "@testing-library/jest-dom/extend-expect"
import { render, fireEvent } from "@testing-library/react"
import { screen } from "@testing-library/react"
import { AmountInput } from "./AmountInput"

describe("AmountInput", () => {
  it("should render with correct value", () => {
    render(<AmountInput name="aaa" value={10} onChange={jest.fn()} />)
    const input = screen.getByRole("spinbutton", { name: "aaa" })
    expect(input).toHaveValue(10)
  })

  it("should call the onChange handler", () => {
    const mockHandler = jest.fn()
    render(<AmountInput name="aaa" value={10} onChange={mockHandler} />)

    const input = screen.getByRole("spinbutton")
    fireEvent.change(input, { target: { value: "20" } })

    expect(mockHandler).toHaveBeenCalledTimes(1)
    expect(mockHandler).toHaveBeenCalledWith(20)
  })

  it("acepts min, max and step", () => {
    render(
      <AmountInput
        name="abc"
        value={10}
        onChange={jest.fn()}
        min={-10}
        max={42}
        step={7}
      />,
    )
    const input = screen.getByRole("spinbutton")
    expect(input).toHaveAttribute("name", "abc")
    expect(input).toHaveAttribute("min", "-10")
    expect(input).toHaveAttribute("max", "42")
    expect(input).toHaveAttribute("step", "7")
  })
})

describe("PercenrtageInput", () => {
  it("should render with correct value", () => {
    render(<AmountInput.Percents name="xxx" value={10} onChange={jest.fn()} />)

    const input = screen.getByRole("spinbutton", { name: "xxx" })
    expect(input).toHaveValue(10)
  })

  it("should call the onChange handler", () => {
    const mockHandler = jest.fn()
    render(<AmountInput.Percents name="" value={10} onChange={mockHandler} />)

    const input = screen.getByRole("spinbutton")
    fireEvent.change(input, { target: { value: "20" } })

    expect(mockHandler).toHaveBeenCalledTimes(1)
    expect(mockHandler).toHaveBeenCalledWith(20)
  })

  it("should min max and step attrs", () => {
    render(<AmountInput.Percents name="xyz" value={10} onChange={jest.fn()} />)
    const input = screen.getByRole("spinbutton")
    expect(input).toHaveAttribute("name", "xyz")
    expect(input).toHaveAttribute("min", "0")
    expect(input).toHaveAttribute("max", "100")
    expect(input).toHaveAttribute("step", "5")
  })
})
