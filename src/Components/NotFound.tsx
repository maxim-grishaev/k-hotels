import { Alert } from "antd"

export const NotFound = (props: { children: React.ReactNode }) => {
  return <Alert message={props.children} type="warning" showIcon />
}
