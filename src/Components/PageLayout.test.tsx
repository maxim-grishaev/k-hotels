import { testRenderWithRouter } from "../Router/testRenderWithRouter"
import { PageLayout } from "./PageLayout"

describe("PageLayout", () => {
  it.each([true, false])("should render", async (isHome) => {
    await testRenderWithRouter(
      <PageLayout disableHomeLink={isHome}>123</PageLayout>,
    )
  })
})
