import { PolicyOfCancellation, PolicyOfNoShow } from "../Store/venue/fetchData"
import { AmountInput } from "./AmountInput"

export const PolicyAmountInput = (props: {
  policy: PolicyOfNoShow | PolicyOfCancellation
  name: string
  currency: string
  onChange: (v: number) => void
}) =>
  props.policy.chargeType === "percentage" ? (
    <AmountInput.Percents
      name={props.name}
      value={props.policy.amount}
      onChange={props.onChange}
    />
  ) : (
    <AmountInput
      name={props.name}
      value={props.policy.amount}
      onChange={props.onChange}
      suffix={props.currency}
    />
  )
