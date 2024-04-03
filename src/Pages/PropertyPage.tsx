import styled from "styled-components"
import { Center } from "../Components/Center"
import { VenuePolicies, VenueProperty } from "../Store/venue/fetchData"
import { PageLayout } from "../Components/PageLayout"
import { Flex, Image, Progress } from "antd"
import { getAllPropertiesURL } from "../lib/nav"
import { Link } from "react-router-dom"
import { NotFoundPage } from "./NotFoundPage"
import { useOneVenue } from "../hooks/useOneVenue"

export const PropertyPage = ({ id }: { id: string }) => {
  const ven = useOneVenue(id)
  if (ven === undefined) {
    return <NotFoundPage>Property with id {id} is not found</NotFoundPage>
  }
  return <PropertyPageUI property={ven.property} policies={ven.policies} />
}

const IMG_HEIGHT = 100
export const PropertyPageUI = ({
  property,
  policies,
}: {
  property: VenueProperty
  policies: VenuePolicies
}) => (
  <PageLayout>
    <Center style={{ width: "60%" }}>
      <BackLink to={getAllPropertiesURL()}>&larr; Back to properties</BackLink>
      <PageTitle>
        {property.name}
        <Gray>
          {property.addressLine1}, {property.postcode} {property.city},{" "}
          {property.country}
        </Gray>
      </PageTitle>

      <Flex gap="30px">
        <MainCol>
          <h4>Images: {property.images.length}</h4>
          <Flex gap="5px" justify="flex-start" wrap="wrap">
            {property.images.map((img) => (
              <Image
                key={img.id}
                src={img.url}
                alt={`id ${img.id}`}
                height={IMG_HEIGHT}
                width={img.width * (IMG_HEIGHT / img.height)}
              />
            ))}
          </Flex>
          <h4>No show policies</h4>
          <BubbleBlock>
            {policies.noShowPolicies.map((it) => (
              <PolicyRow
                key={it.id}
                name={it.name}
                description={it.description}
                amount={it.amount}
                chargeType={
                  it.chargeType === "percentage" ? "%" : property.currency
                }
              />
            ))}
          </BubbleBlock>

          <h4>Cancellation policies</h4>
          <BubbleBlock>
            {policies.cancellationPolicies.map((it) => (
              <PolicyRow
                key={it.id}
                name={it.name}
                description={it.description}
                amount={it.amount}
                chargeType={
                  it.chargeType === "percentage" ? "%" : property.currency
                }
              />
            ))}
          </BubbleBlock>
        </MainCol>

        <SideCol>
          <h4>Property info</h4>
          <BubbleBlock>
            <Row label="ID">{property.id}</Row>
            <Row label="Star Rating">
              <Progress
                showInfo={false}
                percent={(property.starRating / 5) * 100}
                steps={5}
                strokeLinecap="butt"
              />
            </Row>
            <Row label="Rooms">{property.rooms}</Row>
            <Row label="Check-in time">{property.checkInTime}</Row>
            <Row label="Check-out time">{property.checkOutTime}</Row>
            <Row label="Currency">{property.currency}</Row>
            <Row label="Status">{property.status ? "On" : "Off"}</Row>
            <Row label="Time zone">{property.timezone}</Row>
          </BubbleBlock>

          <h4>Contacts</h4>
          <BubbleBlock>
            <Row label="Phone:">
              {!property.phoneNumber ? (
                <Gray>N/A</Gray>
              ) : (
                <a href={`tel:${property.phoneNumber}`}>
                  {property.phoneNumber ?? "N/A"}
                </a>
              )}
            </Row>
            <Row label="Domain">
              {!property.domain ? (
                <Gray>N/A</Gray>
              ) : (
                <a
                  href={`https://${property.domain}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  {property.domain}
                </a>
              )}
            </Row>
            <Row label="Email:">
              {!property.email ? (
                <Gray>N/A</Gray>
              ) : (
                <a href={`mailto:${property.email}`}>{property.email}</a>
              )}
            </Row>
          </BubbleBlock>
        </SideCol>
      </Flex>
    </Center>
  </PageLayout>
)

const Gray = styled.span`
  color: #888;
`

const PageTitle = styled.h1`
  margin: 10px 0;
  font-weight: 300;
  font-size: 36px;
  ${Gray} {
    display: block;
    color: #888;
    font-size: 14px;
    font-style: normal;
  }
`

const PolicyRow = (props: {
  name: string
  description: string
  amount: number
  chargeType: string
}) => (
  <RowEven>
    <span>
      {props.description}
      <Gray>{props.name}</Gray>
    </span>
    <span>
      {props.amount}
      {props.chargeType}
    </span>
  </RowEven>
)

const Label = styled.span`
  font-weight: 500;
  color: #999;
  margin-right: 1ex;
`

const Value = styled.span`
  color: #111;
  overflow: hidden;
  text-overflow: ellipsis;
`

const Row = (props: { label: string; children: React.ReactNode }) => (
  <RowEven>
    <Label>{props.label}</Label>
    <Value>{props.children}</Value>
  </RowEven>
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
  width: 250px;
`

const MainCol = styled(Col)`
  flex: 1;
`

const RowEven = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 13px 0;
  ${Gray} {
    display: block;
    color: #333;
    font-size: 80%;
    font-style: normal;
  }
`

const BubbleBlock = styled.div`
  padding: 7px 10px;
  background: white;
  margin: 11px 0px;
  border-radius: 11px;
  display: flex;
  flex-direction: column;
`
