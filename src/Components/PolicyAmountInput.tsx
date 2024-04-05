import { PolicyCancellation, PolicyNoShow } from "../Store/venue/fetchData"
import { AmountInput, PercenrtageInput } from "./Input"

export const PolicyAmountInput = ({
  policy,
  currency,
  onChange,
}: {
  policy: PolicyNoShow | PolicyCancellation
  currency: string
  onChange: (v: number) => void
}) =>
  policy.chargeType === "percentage" ? (
    <PercenrtageInput value={policy.amount} onChange={onChange} />
  ) : (
    <AmountInput value={policy.amount} onChange={onChange} suffix={currency} />
  )
