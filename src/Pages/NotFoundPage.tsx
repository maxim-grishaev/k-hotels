import { Alert } from "antd"
import { Link } from "react-router-dom"
import { BubbleBlock, Center, Gray } from "../Components/atoms"
import { PageLayout } from "../Components/PageLayout"
import { getAllPropertiesURL } from "../lib/nav"

export const NotFoundPage = (props: { children: React.ReactNode }) => (
  <PageLayout>
    <Center>
      <h1>
        Not found <Gray>&middot; 404</Gray>
      </h1>
      <BubbleBlock>
        <Alert message={props.children} type="error" showIcon />
        <p>
          <Link to={getAllPropertiesURL()}>&larr; Show all properties</Link>
        </p>
      </BubbleBlock>
    </Center>
  </PageLayout>
)
