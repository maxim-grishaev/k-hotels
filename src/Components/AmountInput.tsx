import { Input } from "antd"

export const AmountInput = (props: {
  name: string
  value: number
  onChange: (val: number) => void
  min?: number
  max?: number
  suffix?: string
  step?: number
}) => (
  <Input
    type="number"
    name={props.name}
    aria-label={props.name}
    value={props.value}
    min={props.min ?? 0}
    max={props.max}
    step={props.step}
    onChange={(e) => props.onChange(Number(e.target.value))}
    suffix={props.suffix}
  />
)

const AmountInputPercents = (props: {
  name: string
  value: number
  onChange: (val: number) => void
}) => (
  <AmountInput
    name={props.name}
    value={props.value}
    onChange={props.onChange}
    min={0}
    max={100}
    step={5}
    suffix="%"
  />
)

AmountInput.Percents = AmountInputPercents
