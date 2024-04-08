import { Menu } from "antd"
import { Link } from "react-router-dom"
import { getAllPropertiesURL } from "../lib/nav"

export const Navbar = (props: { disableHomeLink: boolean }) => {
  return (
    <Menu
      mode="horizontal"
      items={[
        {
          label: <Link to={getAllPropertiesURL()}>Properties</Link>,
          key: "properties",
          disabled: props.disableHomeLink,
        },
      ]}
    />
  )
}
