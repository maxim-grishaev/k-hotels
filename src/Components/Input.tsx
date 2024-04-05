import { Input } from "antd"

export const PercenrtageInput = (props: {
  value: number
  onChange: (val: number) => void
}) => (
  <Input
    type="number"
    value={props.value}
    max={100}
    min={0}
    onChange={(e) => props.onChange(Number(e.target.value))}
    suffix="%"
  />
)

export const AmountInput = (props: {
  value: number
  onChange: (val: number) => void
  min?: number
  max?: number
  suffix?: string
}) => (
  <Input
    type="number"
    value={props.value}
    min={props.min ?? 0}
    max={props.max}
    onChange={(e) => props.onChange(Number(e.target.value))}
    suffix={props.suffix}
  />
)
