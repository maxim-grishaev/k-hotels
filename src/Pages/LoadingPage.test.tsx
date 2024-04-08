import "@testing-library/jest-dom/extend-expect"
import { testRenderWithRouter } from "../Router/testRenderWithRouter"
import { LoadingPage } from "./LoadingPage"

describe("LoadingPage", () => {
  it("should render", async () => {
    await testRenderWithRouter(<LoadingPage />)
  })
})
