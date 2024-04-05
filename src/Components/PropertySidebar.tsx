import styled from "styled-components"
import { Progress } from "antd"
import { Gray } from "./atoms"
import { Venue } from "../Store/venue/fetchData"
import { ASectionWithTitle } from "./ASectionWithTitile"

export const PropertySidebar = ({
  property,
}: {
  property: Venue["property"]
}) => (
  <>
    <ASectionWithTitle title="Property">
      <Row label="ID">{property.id}</Row>
      <Row label="Rating">
        <Progress
          showInfo={false}
          percent={(property.starRating / 5) * 100}
          steps={5}
          strokeLinecap="round"
        />
      </Row>
      <Row label="Rooms">{property.rooms}</Row>
      <Row label="Check-in time">{property.checkInTime}</Row>
      <Row label="Check-out time">{property.checkOutTime}</Row>
      <Row label="Currency">{property.currency}</Row>
      <Row label="Status">{property.status ? "On" : "Off"}</Row>
      <Row label="Time zone">{property.timezone}</Row>
    </ASectionWithTitle>

    <ASectionWithTitle title="Contacts">
      <Row label="Phone:">
        {property.phoneNumber && (
          <a href={`tel:${property.phoneNumber}`}>{property.phoneNumber}</a>
        )}
      </Row>
      <Row label="Domain">
        {property.domain && (
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
        {property.email && (
          <a href={`mailto:${property.email}`}>{property.email}</a>
        )}
      </Row>
    </ASectionWithTitle>

    <ASectionWithTitle title="Description">
      <p>{property.description ?? <Gray>N/A</Gray>}</p>
    </ASectionWithTitle>
  </>
)

const Label = styled.span`
  font-weight: 300;
  color: #333;
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
    <Value>{!props.children ? <Gray>N/A</Gray> : props.children}</Value>
  </RowEven>
)

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
