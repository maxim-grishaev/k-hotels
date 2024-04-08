import styled from "styled-components"
import { Link } from "react-router-dom"
import { Flex } from "antd"
import { Center, Subtitle } from "../Components/atoms"
import { PageLayout } from "../Components/PageLayout"
import { getAllPropertiesURL } from "../lib/nav"
import { NotFoundPage } from "./NotFoundPage"
import { useOneVenue } from "../hooks/useOneVenue"
import { PropertySection } from "../Components/PropertySection"
import { ImgPreviewList } from "../Components/ImgPreview"
import { PoliciesSection } from "../Components/PoliciesSection"
import { Venue } from "../Store/venue/fetchData"
import { getPropertyAddress } from "../lib/getAddress"

export const VenuePage = ({ id }: { id: string }) => {
  const ven = useOneVenue(id)
  if (ven === undefined) {
    return <NotFoundPage>Property with id {id} is not found</NotFoundPage>
  }
  return <PropertyPageUI venue={ven} />
}

export const PropertyPageUI = ({ venue }: { venue: Venue }) => (
  <PageLayout>
    <Center>
      <BackLink to={getAllPropertiesURL()}>&larr; Back to properties</BackLink>
      <h1>
        {venue.property.name}
        <Subtitle>{getPropertyAddress(venue.property)}</Subtitle>
      </h1>

      <Flex gap="30px">
        <MainCol>
          <ImgWrap>
            <ImgPreviewList images={venue.property.images} />
          </ImgWrap>

          <h2>Policies</h2>
          <PoliciesSection
            propertyId={venue.property.id}
            cancellationPolicies={venue.policies.cancellationPolicies}
            noShowPolicies={venue.policies.noShowPolicies}
            currency={venue.property.currency}
          />
        </MainCol>

        <SideCol>
          <PropertySection property={venue.property} />
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
