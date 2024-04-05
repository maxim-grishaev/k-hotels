import { Button, Table } from "antd"
import { Venue } from "../Store/venue/fetchData"
import Column from "antd/es/table/Column"
import { Link } from "react-router-dom"
import { getPropertyURL } from "../lib/nav"
import { ImgPreviewItem } from "./ImgPreview"
import { getPropertyAddress } from "../lib/getAddress"
import { Gray } from "./atoms"

export const PropertiesTable = ({
  properties,
}: {
  properties: Venue["property"][]
}) => (
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
    <Column dataIndex="image" title="" key="image" width={120} />
    <Column dataIndex="name" title="Name" key="name" />
    <Column dataIndex="address" title="Address" key="address" />
    <Column dataIndex="id" title="ID" key="id" width={1} />
    <Column dataIndex="action" title="" key="actions" width={1} />
  </Table>
)

const ImgCell = ({ item }: { item: Venue["property"] }) =>
  item.images.length > 0 ? (
    <ImgPreviewItem image={item.images[0]} alt={item.name} />
  ) : null

const NameCell = ({ item }: { item: Venue["property"] }) => (
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
