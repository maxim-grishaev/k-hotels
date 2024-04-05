import { Flex } from "antd"
import { styled } from "styled-components"
import { useUpdatePolicyOfNoShow } from "../hooks/useUpdatePolicyOf"
import { PolicyOfNoShow } from "../Store/venue/fetchData"
import { Gray } from "./atoms"
import { PolicyAmountInput } from "./PolicyAmountInput"

export const RowForPolicyOfNoShow = ({
  propertyId,
  policy,
  currency,
}: {
  propertyId: string
  policy: PolicyOfNoShow
  currency: string
}) => {
  const onPolicyChange = useUpdatePolicyOfNoShow({
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
          name="Cost"
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
