import { styled } from "styled-components"
import { usePoliciesOverview } from "../hooks/usePoliciesOverview"
import { ASectionWithTitle } from "./ASectionWithTitile"
import { RowForPolicyOfCancellation } from "./RowForPolicyOfCancellation"
import { RowForPolicyOfNoShow } from "./RowForPolicyOfNoShow"

export const PoliciesSection = ({ propertyId }: { propertyId: string }) => {
  const pov = usePoliciesOverview(propertyId)
  return (
    <>
      <ASectionWithTitle title="No show">
        {pov.noShow.map((id) => (
          <Item key={id}>
            <RowForPolicyOfNoShow
              propertyId={propertyId}
              policyId={id}
              currency={pov.currency}
            />
          </Item>
        ))}
        {pov.noShow.length === 0 && <p>None</p>}
      </ASectionWithTitle>

      <ASectionWithTitle title="Cancellation">
        {pov.cancellation.map((id) => (
          <Item key={id}>
            <RowForPolicyOfCancellation
              propertyId={propertyId}
              policyId={id}
              currency={pov.currency}
            />
          </Item>
        ))}
        {pov.cancellation.length === 0 && <p>None</p>}
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
