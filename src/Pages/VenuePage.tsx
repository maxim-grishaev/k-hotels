import styled from "styled-components"
import { Center, Subtitle } from "../Components/atoms"
import { PageLayout } from "../Components/PageLayout"
import { Flex } from "antd"
import { getAllPropertiesURL } from "../lib/nav"
import { Link } from "react-router-dom"
import { NotFoundPage } from "./NotFoundPage"
import { useOneVenue } from "../hooks/useOneVenue"
import { PropertySidebar } from "./PropertySidebar"
import { ImgPreviewList } from "./ImgPreview"
import { PoliciesSection } from "./PoliciesSection"
import { Gray } from "../Components/atoms"
import { VenuePoliciesDict, VenuePropertyInfo } from "../Store/venue/fetchData"
import { useDispatch } from "react-redux"
import { venueSlice } from "../Store/venue/venueSlice"
import { getPropertyAddress } from "../lib/getAddress"

export const VenuePage = ({ id }: { id: string }) => {
  const ven = useOneVenue(id)
  const dispatch = useDispatch()
  if (ven === undefined) {
    return <NotFoundPage>Property with id {id} is not found</NotFoundPage>
  }
  return (
    <PropertyPageUI
      property={ven.property}
      policies={ven.policies}
      onPolicyChange={(policyId, value) => {
        dispatch(
          venueSlice.actions.setPolicyValue({
            propertyId: ven.property.id,
            policyId: policyId,
            amount: value,
          }),
        )
      }}
    />
  )
}

export const PropertyPageUI = ({
  property,
  policies,
  onPolicyChange,
}: {
  property: VenuePropertyInfo
  policies: VenuePoliciesDict
  onPolicyChange: (policyId: string, value: number) => void
}) => (
  <PageLayout>
    <Center>
      <BackLink to={getAllPropertiesURL()}>&larr; Back to properties</BackLink>
      <h1>
        {property.name}
        <Subtitle>{getPropertyAddress(property)}</Subtitle>
      </h1>

      <Flex gap="50px">
        <MainCol>
          <h3>
            Images <Gray>&middot; {property.images.length}</Gray>
          </h3>
          <ImgPreviewList images={property.images} />

          <PoliciesSection
            policies={policies}
            currency={property.currency}
            onPolicyChange={onPolicyChange}
          />
        </MainCol>

        <SideCol>
          <PropertySidebar property={property} />
        </SideCol>
      </Flex>
    </Center>
  </PageLayout>
)

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
