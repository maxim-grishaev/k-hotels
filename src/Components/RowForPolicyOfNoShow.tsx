import { Alert, Flex } from "antd"
import { styled } from "styled-components"
import { usePolicyOfNoShow } from "../hooks/usePolicyOf"
import { Gray } from "./atoms"
import { PolicyAmountInput } from "./PolicyAmountInput"

export const RowForPolicyOfNoShow = ({
  propertyId,
  policyId,
  currency,
}: {
  propertyId: string
  policyId: string
  currency: string
}) => {
  const pol = usePolicyOfNoShow({ propertyId, policyId })
  if (!pol.policy) {
    return (
      <Alert
        type="warning"
        message={`Policy with id ${policyId} is not found`}
      />
    )
  }

  return (
    <Flex justify="space-between" gap="20px">
      <Flex vertical gap="5px">
        <strong>{pol.policy.name}</strong>
        <Gray>{pol.policy.description}</Gray>
      </Flex>
      <PolicyVal>
        <PolicyAmountInput
          name="Cost"
          policy={pol.policy}
          onChange={(v) => pol.update({ amount: v })}
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
