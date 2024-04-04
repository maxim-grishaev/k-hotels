import React from "react"
import styled from "styled-components"
import { Gray } from "../Components/atoms"
import { ASectionWithTitle } from "../Components/ASectionWithTitile"
import { VenuePoliciesDict, PolicyDataItem } from "../Store/venue/fetchData"
import { AmountInput, PercenrtageInput } from "../Components/Input"

export const PoliciesSection = ({
  policies,
  currency,
  onPolicyChange,
}: {
  policies: VenuePoliciesDict
  currency: string
  onPolicyChange: (policyId: string, value: number) => void
}) => {
  return (
    <>
      <ASectionWithTitle title="No show policies">
        {policies.noShowPolicies.map((it) => (
          <PolicyRow key={it.id} name={it.name} description={it.description}>
            <PolicyInput
              policy={it}
              onChange={onPolicyChange}
              currency={currency}
            />
          </PolicyRow>
        ))}
      </ASectionWithTitle>

      <ASectionWithTitle title="Cancellation policies">
        {policies.cancellationPolicies.map((it) => (
          <PolicyRow key={it.id} name={it.name} description={it.description}>
            <PolicyInput
              policy={it}
              onChange={onPolicyChange}
              currency={currency}
            />
          </PolicyRow>
        ))}
      </ASectionWithTitle>
    </>
  )
}

const PolicyInput = ({
  policy,
  currency,
  onChange,
}: {
  policy: PolicyDataItem
  currency: string
  onChange: (pid: string, v: number) => void
}) =>
  policy.chargeType === "percentage" ? (
    <PercenrtageInput
      value={policy.amount}
      onChange={(v) => onChange(policy.id, v)}
    />
  ) : (
    <AmountInput
      value={policy.amount}
      onChange={(v) => onChange(policy.id, v)}
      suffix={currency}
    />
  )

const PolicyRow = (props: {
  name: string
  description: string
  children: React.ReactNode
}) => (
  <RowEven>
    <PolicyLabel>
      {props.description}
      <br />
      <Gray>{props.name}</Gray>
    </PolicyLabel>
    <PolicyVal>{props.children}</PolicyVal>
  </RowEven>
)

const PolicyVal = styled.span`
  display: block;
  width: 100px;
  flex-shrink: 0;
`

const PolicyLabel = styled.span`
  display: block;
  margin-right: 20px;
`

const RowEven = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 10px;
  & + & {
    border-top: 1px dotted #ddd;
  }
  ${Gray} {
    display: block;
    font-size: 90%;
    font-style: normal;
  }
`
