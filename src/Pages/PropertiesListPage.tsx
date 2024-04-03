import { PropertiesTable } from "../Components/PropertiesTable"
import { Center } from "../Components/Center"
import { PageLayout } from "../Components/PageLayout"
import { VenueProperty } from "../Store/venue/fetchData"
import { useAllProperties } from "../hooks/useAllProperties"

export const PropertiesListPage = () => (
  <PropertiesListPageUI properties={useAllProperties()} />
)

export const PropertiesListPageUI = ({
  properties,
}: {
  properties: VenueProperty[]
}) => (
  <PageLayout isHome>
    <Center>
      <h3>Properties: {properties.length}</h3>
      <PropertiesTable properties={properties} />
    </Center>
  </PageLayout>
)
