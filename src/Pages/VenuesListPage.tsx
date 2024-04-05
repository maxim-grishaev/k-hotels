import { PropertiesTable } from "../Components/PropertiesTable"
import { Center, Gray } from "../Components/atoms"
import { PageLayout } from "../Components/PageLayout"
import { Property } from "../Store/venue/fetchData"
import { useAllProperties } from "../hooks/useAllProperties"

export const VenuesListPage = () => (
  <VenuesListPageUI properties={useAllProperties()} />
)

export const VenuesListPageUI = ({
  properties,
}: {
  properties: Property[]
}) => (
  <PageLayout disableHomeLink>
    <Center>
      <h1>
        Properties <Gray>&middot; {properties.length}</Gray>
      </h1>
      <PropertiesTable properties={properties} />
    </Center>
  </PageLayout>
)
