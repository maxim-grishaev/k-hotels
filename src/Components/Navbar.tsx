import { Menu } from "antd"
import { useNavigate } from "react-router-dom"
import { getAllPropertiesURL } from "../lib/nav"

export const Navbar = (props: { isHome: boolean }) => {
  const navigate = useNavigate()
  const onClick = () => {
    navigate(getAllPropertiesURL())
  }
  return (
    <Menu
      onClick={onClick}
      mode="horizontal"
      items={[
        {
          label: "Properties",
          key: "properties",
          disabled: props.isHome,
        },
      ]}
    />
  )
}
