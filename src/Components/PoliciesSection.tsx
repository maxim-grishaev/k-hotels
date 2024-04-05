import { styled } from "styled-components"
import { ASectionWithTitle } from "./ASectionWithTitile"
import { PolicyOfCancellation, PolicyOfNoShow } from "../Store/venue/fetchData"
import { RowForPolicyOfCancellation } from "./RowForPolicyOfCancellation"
import { RowForPolicyOfNoShow } from "./RowForPolicyOfNoShow"

export const PoliciesSection = ({
  propertyId,
  currency,
  noShowPolicies,
  cancellationPolicies,
}: {
  propertyId: string
  noShowPolicies: PolicyOfNoShow[]
  cancellationPolicies: PolicyOfCancellation[]
  currency: string
}) => {
  return (
    <>
      <ASectionWithTitle title="No show">
        {noShowPolicies.map((it) => (
          <Item key={it.id}>
            <RowForPolicyOfNoShow
              propertyId={propertyId}
              policy={it}
              currency={currency}
            />
          </Item>
        ))}
        {noShowPolicies.length === 0 && <p>None</p>}
      </ASectionWithTitle>

      <ASectionWithTitle title="Cancellation">
        {cancellationPolicies.map((it) => (
          <Item key={it.id}>
            <RowForPolicyOfCancellation
              propertyId={propertyId}
              policy={it}
              currency={currency}
            />
          </Item>
        ))}
        {cancellationPolicies.length === 0 && <p>None</p>}
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
