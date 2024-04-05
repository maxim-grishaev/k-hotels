import { Flex } from "antd"
import { styled } from "styled-components"
import { usePolicyNoSHowCallback } from "../hooks/usePolicyUpdateCallback"
import { PolicyNoShow } from "../Store/venue/fetchData"
import { Gray } from "./atoms"
import { PolicyAmountInput } from "./PolicyAmountInput"

export const PolicyRowNoShow = ({
  propertyId,
  policy,
  currency,
}: {
  propertyId: string
  policy: PolicyNoShow
  currency: string
}) => {
  const onPolicyChange = usePolicyNoSHowCallback({
    propertyId,
    policyId: policy.id,
  })
  return (
    <Flex justify="space-between" gap="20px">
      <Flex vertical gap="5px">
        <strong>{policy.name}</strong>
        <Gray>{policy.description}</Gray>
      </Flex>
      <PolicyVal>
        <PolicyAmountInput
          policy={policy}
          onChange={(v) => onPolicyChange({ amount: v })}
          currency={currency}
        />
      </PolicyVal>
    </Flex>
  )
}

const PolicyVal = styled.span`
  display: block;
  width: 100px;
  flex-shrink: 0;
  margin-left: 1ex;
`
