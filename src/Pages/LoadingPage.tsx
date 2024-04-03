import { Center } from "../Components/Center"
import { PageLayout } from "../Components/PageLayout"

export const LoadingPage = (props: { children?: React.ReactNode }) => (
  <PageLayout isHome>
    <Center>
      <h3>Loading...</h3>
      <p>{props.children}</p>
    </Center>
  </PageLayout>
)
