import { Button, Table } from "antd"
import { Property } from "../Store/venue/fetchData"
import { Link } from "react-router-dom"
import { getPropertyURL } from "../lib/nav"
import { ImgPreviewItem } from "./ImgPreview"
import { getPropertyAddress } from "../lib/getAddress"
import { Gray } from "./atoms"

export const PropertiesTable = ({ properties }: { properties: Property[] }) => (
  <Table
    dataSource={properties.map((p) => ({
      id: p.id,
      image: <ImgCell item={p} />,
      name: <NameCell item={p} />,
      address: getPropertyAddress(p),
      action: <ActionsCell id={p.id} />,
    }))}
    rowKey="id"
  >
    <Table.Column dataIndex="image" title="" key="image" width={120} />
    <Table.Column dataIndex="name" title="Name" key="name" />
    <Table.Column dataIndex="address" title="Address" key="address" />
    <Table.Column dataIndex="id" title="ID" key="id" width={1} />
    <Table.Column dataIndex="action" title="" key="actions" width={1} />
  </Table>
)

const ImgCell = ({ item }: { item: Property }) =>
  item.images.length > 0 ? (
    <ImgPreviewItem image={item.images[0]} alt={item.name} />
  ) : null

const NameCell = ({ item }: { item: Property }) => (
  <p>
    <Link to={getPropertyURL(item.id)}>{item.name}</Link>
    <br />
    <Gray>{item.description}</Gray>
  </p>
)

const ActionsCell = ({ id }: { id: string }) => (
  <Link to={getPropertyURL(id)}>
    <Button size="small">Open</Button>
  </Link>
)
