import { Flex, Image } from "antd"

type ImageData = {
  id: string
  url: string
  width: number
  height: number
  alt?: string
}

const IMG_HEIGHT = 70

export const ImgPreviewList = ({ images }: { images: ImageData[] }) => {
  return (
    <Flex gap="5px" justify="flex-start" wrap="wrap">
      {images.map((img) => (
        <ImgPreviewItem
          key={img.id}
          image={img}
          alt={img.alt ?? `id ${img.id}`}
        />
      ))}
    </Flex>
  )
}

export const ImgPreviewItem = ({
  image,
  alt,
}: {
  image: ImageData
  alt: string
}) => (
  <Image
    src={image.url}
    alt={alt}
    height={IMG_HEIGHT}
    width={image.width * (IMG_HEIGHT / image.height)}
  />
)
