import { Button, Image, Table } from "antd"
import { VenueProperty } from "../Store/venue/fetchData"
import Column from "antd/es/table/Column"
import { Link } from "react-router-dom"
import { getPropertyURL } from "../lib/nav"

export const PropertiesTable = ({
  properties,
}: {
  properties: VenueProperty[]
}) => (
  <Table
    dataSource={properties.map((p) => ({
      id: p.id,
      image: <ImgCell image={p.images[0]} alt={p.name} />,
      name: <NameCell item={p} />,
      action: <ActionsCell id={p.id} />,
    }))}
    rowKey="id"
  >
    <Column dataIndex="image" title="Image" key="image" width={120} />
    <Column dataIndex="name" title="Name" key="name" />
    <Column dataIndex="id" title="Id" key="id" width={1} />
    <Column dataIndex="action" title="Actions" key="actions" width={1} />
  </Table>
)

const NameCell = ({ item }: { item: VenueProperty }) => (
  <Link to={getPropertyURL(item.id)}>{item.name}</Link>
)

const ImgCell = ({
  image,
  alt,
}: {
  image?: VenueProperty["images"][number]
  alt: string
}) =>
  image !== undefined ? <Image src={image.url} width={100} alt={alt} /> : null

const ActionsCell = ({ id }: { id: string }) => (
  <Link to={getPropertyURL(id)}>
    <Button size="small">Open</Button>
  </Link>
)
