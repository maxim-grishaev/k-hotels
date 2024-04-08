import { render } from "@testing-library/react"
import { ImageData, ImgPreviewList } from "./ImgPreview"

const imgURL =
  "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"

describe("ImgPreview", () => {
  it("should render", () => {
    const images: ImageData[] = [
      { id: "1", url: imgURL, width: 100, height: 100 },
      { id: "2", url: imgURL, width: 100, height: 100 },
    ]
    render(<ImgPreviewList images={images} />)
  })
})
