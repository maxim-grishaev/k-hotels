import styled from "styled-components"
import { Link } from "react-router-dom"
import { Alert, Flex } from "antd"
import { Center, Subtitle } from "../Components/atoms"
import { PageLayout } from "../Components/PageLayout"
import { getAllPropertiesURL } from "../lib/nav"
import { NotFoundPage } from "./NotFoundPage"
import { useOneProperty } from "../hooks/useOneProperty"
import { PropertySection } from "../Components/PropertySection"
import { ImgPreviewList } from "../Components/ImgPreview"
import { PoliciesSection } from "../Components/PoliciesSection"
import { Property } from "../Store/venue/fetchData"
import { getPropertyAddress } from "../lib/getAddress"

export const VenuePage = ({ id }: { id: string }) => {
  const prop = useOneProperty(id)
  if (prop === undefined) {
    return <NotFoundPage>Property with id {id} is not found</NotFoundPage>
  }
  return <PropertyPageUI property={prop} />
}

export const PropertyPageUI = ({ property }: { property: Property }) => (
  <PageLayout>
    <Center>
      <BackLink to={getAllPropertiesURL()}>&larr; Back to properties</BackLink>
      <h1>
        {property.name}
        <Subtitle>{getPropertyAddress(property)}</Subtitle>
      </h1>

      <Flex gap="30px">
        <MainCol>
          <ImgWrap>
            {property.images.length > 0 ? (
              <ImgPreviewList images={property.images} />
            ) : (
              <Alert type="info" message="No images yet..." />
            )}
          </ImgWrap>

          <h2>Policies</h2>
          <PoliciesSection propertyId={property.id} />
        </MainCol>

        <SideCol>
          <PropertySection property={property} />
        </SideCol>
      </Flex>
    </Center>
  </PageLayout>
)

const ImgWrap = styled.div`
  margin-top: 20px;
`

const BackLink = styled(Link)`
  float: right;
  margin-top: 1em;
  margin-left: 1em;
`

const Col = styled.div`
  display: flex;
  flex-direction: column;
`

const SideCol = styled(Col)`
  width: 300px;
`

const MainCol = styled(Col)`
  flex: 1;
`
