import styled from "styled-components"
import { Progress } from "antd"
import { Gray } from "./atoms"
import { Property } from "../Store/venue/fetchData"
import { ASectionWithTitle } from "./ASectionWithTitile"

export const PropertySection = ({ property }: { property: Property }) => (
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

const Value = styled.span`
  overflow: hidden;
  text-overflow: ellipsis;
  margin-left: 1ex;
`

const Row = (props: { label: string; children: React.ReactNode }) => (
  <RowEven>
    <Gray>{props.label}</Gray>
    <Value>{!props.children ? <Gray>N/A</Gray> : props.children}</Value>
  </RowEven>
)

const RowEven = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 13px 0;
`
