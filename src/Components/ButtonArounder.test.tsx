import "@testing-library/jest-dom/extend-expect"
import { render, fireEvent } from "@testing-library/react"
import { screen } from "@testing-library/react"
import { ButtonArounder } from "./ButtonArounder"

test("clicking the button calls the event hanlder once", () => {
  const mockHandler = jest.fn()

  render(<ButtonArounder onClick={mockHandler}>this is a test</ButtonArounder>)

  const button = screen.getByText("this is a test", { selector: "button" })
  fireEvent.click(button)

  expect(mockHandler).toHaveBeenCalledTimes(1)
})
