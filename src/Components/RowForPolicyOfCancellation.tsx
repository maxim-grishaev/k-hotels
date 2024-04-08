import { Alert, Button, Flex, Select, Tag } from "antd"
import { styled } from "styled-components"
import { useEditorState } from "../hooks/useEditorState"
import { refL10nMap } from "../lib/l10n"
import { PolicyOfCancellation, Reference } from "../Store/venue/fetchData"
import { Gray } from "./atoms"
import { AmountInput } from "./AmountInput"
import { PolicyAmountInput } from "./PolicyAmountInput"
import { usePolicyOfCancellation } from "../hooks/usePolicyOf"

export const RowForPolicyOfCancellation = ({
  propertyId,
  policyId,
  currency,
}: {
  propertyId: string
  policyId: string
  currency: string
}) => {
  const policy = usePolicyOfCancellation({ propertyId, policyId })
  if (!policy.policy) {
    return (
      <Alert
        type="warning"
        message={`Policy with id ${policyId} is not found`}
      />
    )
  }
  return (
    <RowForPolicyOfCancellationUI
      policy={policy.policy}
      currency={currency}
      onSave={policy.update}
    />
  )
}

export const RowForPolicyOfCancellationUI = ({
  policy,
  currency,
  onSave,
}: {
  policy: PolicyOfCancellation
  currency: string
  onSave: (policy: PolicyOfCancellation) => void
}) => {
  const edit = useEditorState(policy, onSave)
  return edit.isEditing ? (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        edit.save()
      }}
      onReset={(e) => {
        e.preventDefault()
        edit.reset()
      }}
    >
      <PolicyRow
        name={policy.name}
        description={policy.description}
        actions={
          <>
            <Button aria-label="Reset" type="link" htmlType="reset">
              Reset
            </Button>
            <Button aria-label="Save" type="primary" htmlType="submit">
              Save
            </Button>
          </>
        }
      >
        <PolicyRowCancellationEditUI
          policy={edit.editedData}
          currency={currency}
          onChangeAmount={(a) => edit.onChange({ amount: a })}
          onChangeDays={(d) => edit.onChange({ days: d })}
          onChangeHours={(h) => edit.onChange({ hours: h })}
          onChangeRef={(r) => edit.onChange({ reference: r })}
        />
      </PolicyRow>
    </form>
  ) : (
    <PolicyRow
      name={policy.name}
      description={policy.description}
      actions={
        <Button aria-label="Edit" onClick={edit.edit} type="text">
          Edit
        </Button>
      }
    >
      <RowForPolicyOfCancellationViewUI policy={policy} currency={currency} />
    </PolicyRow>
  )
}

export const RowForPolicyOfCancellationViewUI = ({
  policy,
  currency,
}: {
  policy: PolicyOfCancellation
  currency: string
}) => (
  <View>
    <Tag>
      {policy.amount} {policy.chargeType === "percentage" ? "%" : currency}
    </Tag>
    if cancelled{" "}
    {policy.days > 0 ? (
      <>
        <Tag>{policy.days}</Tag>days
      </>
    ) : null}{" "}
    {policy.hours > 0 ? (
      <>
        <Tag>{policy.hours}</Tag>hours
      </>
    ) : null}{" "}
    <Tag>{refL10nMap[policy.reference]}</Tag>
  </View>
)

export const PolicyRowCancellationEditUI = ({
  policy,
  currency,
  onChangeAmount,
  onChangeDays,
  onChangeHours,
  onChangeRef,
}: {
  policy: PolicyOfCancellation
  currency: string
  onChangeAmount: (v: number) => void
  onChangeDays: (v: number) => void
  onChangeHours: (v: number) => void
  onChangeRef: (v: Reference) => void
}) => (
  <Flex gap="1ex" align="baseline" justify="start" wrap="wrap">
    <PolicyVal>
      <PolicyAmountInput
        name="Cost"
        policy={policy}
        onChange={onChangeAmount}
        currency={currency}
      />
    </PolicyVal>

    <TimeVal>
      <AmountInput
        name="Days"
        value={policy.days}
        onChange={onChangeDays}
        suffix="days"
      />
    </TimeVal>

    <TimeVal>
      <AmountInput
        name="Hours"
        value={policy.hours}
        max={23}
        onChange={onChangeHours}
        suffix="hours"
      />
    </TimeVal>

    <Select
      aria-label="Reference"
      value={policy.reference}
      onChange={onChangeRef}
    >
      <Select.Option value="prior-to-arrival">
        {refL10nMap["prior-to-arrival"]}
      </Select.Option>
      <Select.Option value="after-booking">
        {refL10nMap["after-booking"]}
      </Select.Option>
    </Select>
  </Flex>
)

const PolicyRow = (props: {
  name: React.ReactNode
  description: string
  children: React.ReactNode
  actions: React.ReactNode
}) => (
  <Flex gap="10px" justify="space-between">
    <Col1 vertical gap="3px">
      <strong>{props.name}</strong>
      <Gray>{props.description}</Gray>
    </Col1>
    <Col2 align="center">{props.children}</Col2>
    <Col3 justify="end" align="center">
      {props.actions}
    </Col3>
  </Flex>
)

const View = styled.div`
  display: block;
`

const Col1 = styled(Flex)`
  width: 35%;
`
const Col2 = styled(Flex)`
  width: 60%;
`
const Col3 = styled(Flex)`
  width: 200px;
`

const TimeVal = styled.span`
  display: block;
  width: 7.5em;
  flex-shrink: 0;
`

const PolicyVal = styled.span`
  display: block;
  width: 100px;
  flex-shrink: 0;
`
