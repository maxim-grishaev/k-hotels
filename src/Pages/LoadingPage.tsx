import { Skeleton } from "antd"
import { Center } from "../Components/atoms"
import { PageLayout } from "../Components/PageLayout"

export const LoadingPage = () => (
  <PageLayout isHome>
    <Center>
      <h1>Loading...</h1>
      <Skeleton />
    </Center>
  </PageLayout>
)
