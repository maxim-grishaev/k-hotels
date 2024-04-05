import type json from "../../data.json"

type SrcData = (typeof json.data)[number]
type SrcProp = SrcData["property"]
type SrcImg = SrcProp["images"][number]
type SrcPolNo = SrcData["policies"]["noShowPolicies"][number]
type SrcPolCncl = SrcData["policies"]["cancellationPolicies"][number]

export const ReferenceValues = ["prior-to-arrival", "after-booking"] as const
export type Reference = typeof ReferenceValues extends ReadonlyArray<infer T>
  ? T
  : never

type WithOverriden<T, U = unknown> = {
  [k in Exclude<keyof T, keyof U>]: T[k]
} & U

export type ImgData = WithOverriden<SrcImg>
export type Property = WithOverriden<SrcProp, { images: ImgData[] }>
export type PolicyNoShow = WithOverriden<SrcPolNo>
export type PolicyCancellation = WithOverriden<
  SrcPolCncl,
  { reference: Reference }
>

export type Venue = {
  property: Property
  policies: {
    noShowPolicies: PolicyNoShow[]
    cancellationPolicies: PolicyCancellation[]
  }
}

export const fetchData = async () => {
  const data = await import("../../data.json")
  return data.data as Venue[]
}
