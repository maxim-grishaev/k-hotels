import { Alert } from "antd"
import { Link } from "react-router-dom"
import { Center } from "../Components/Center"
import { PageLayout } from "../Components/PageLayout"
import { getAllPropertiesURL } from "../lib/nav"

export const NotFoundPage = (props: { children: React.ReactNode }) => (
  <PageLayout>
    <Center>
      <h3>404 Not found</h3>
      <Alert message={props.children} type="error" showIcon />
      <p>
        <Link to={getAllPropertiesURL()}>Show all properties</Link>
      </p>
    </Center>
  </PageLayout>
)
