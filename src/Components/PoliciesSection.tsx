import { styled } from "styled-components"
import { ASectionWithTitle } from "./ASectionWithTitile"
import { Venue } from "../Store/venue/fetchData"
import { PolicyRowCancellation } from "./PolicyRowCancellation"
import { PolicyRowNoShow } from "./PolicyRowNoSHow"

export const PoliciesSection = ({
  propertyId,
  policies,
  currency,
}: {
  propertyId: string
  policies: Venue["policies"]
  currency: string
}) => {
  return (
    <>
      <ASectionWithTitle title="No show">
        {policies.noShowPolicies.map((it) => (
          <Item key={it.id}>
            <PolicyRowNoShow
              propertyId={propertyId}
              policy={it}
              currency={currency}
            />
          </Item>
        ))}
      </ASectionWithTitle>

      <ASectionWithTitle title="Cancellation">
        {policies.cancellationPolicies.map((it) => (
          <Item key={it.id}>
            <PolicyRowCancellation
              propertyId={propertyId}
              policy={it}
              currency={currency}
            />
          </Item>
        ))}
      </ASectionWithTitle>
    </>
  )
}

const Item = styled.div`
  padding: 10px;
  & + & {
    border-top: 1px dotted #ddd;
  }
`
