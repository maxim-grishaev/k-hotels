import "@testing-library/jest-dom/extend-expect"
import { testRenderWithRouter } from "../Router/testRenderWithRouter"
import { NotFoundPage } from "./NotFoundPage"

describe("NotFoundPage", () => {
  it("should render", async () => {
    await testRenderWithRouter(<NotFoundPage children={null} />)
  })
})
