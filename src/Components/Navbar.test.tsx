import { testRenderWithRouter } from "../Router/testRenderWithRouter"
import { Navbar } from "./Navbar"

describe("Navbar", () => {
  it.each([true, false])("should render", async (isHome) => {
    await testRenderWithRouter(<Navbar disableHomeLink={isHome} />)
  })
})
