import { PropertiesTable } from "../Components/PropertiesTable"
import { Center } from "../Components/Center"
import { PageLayout } from "../Components/PageLayout"
import { DataProperty } from "../Store/property/service"
import { useAllProperties } from "../hooks/useProperty"

export const PropertiesListPage = () => (
  <PropertiesListPageUI properties={useAllProperties()} />
)

export const PropertiesListPageUI = ({
  properties,
}: {
  properties: DataProperty[]
}) => (
  <PageLayout isHome>
    <Center>
      <h3>Properties: {properties.length}</h3>
      <PropertiesTable properties={properties} />
    </Center>
  </PageLayout>
)
