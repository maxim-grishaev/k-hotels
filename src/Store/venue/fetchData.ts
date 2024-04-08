import type json from "../../data.json"

/*
These are shared API types. They are used to define the shape of the data that is fetched from the server.
The `json` types are inferred as concrete unions, but that's not practical since it's not "generic" to be used in components.
Of course in a "real" app types should be shared somewhat differently or generated from the server's schema.
*/

type SrcData = (typeof json.data)[number]
type SrcProp = SrcData["property"]
type SrcImg = SrcProp["images"][number]
type SrcPolNo = SrcData["policies"]["noShowPolicies"][number]
type SrcPolCncl = SrcData["policies"]["cancellationPolicies"][number]

export const ReferenceValues = ["prior-to-arrival", "after-booking"] as const
export type Reference = typeof ReferenceValues extends ReadonlyArray<infer T>
  ? T
  : never

/**
 * Converts union type to intersection type.
 * @example
 * ```ts
 * WithOverriden<{ a:1, c:3  } | { a:2, b:2 }, { c:'new' }>
 * == { a:1|2, b:2, c:'new' }
 * ```
 */
type WithOverriden<T, U = unknown> = {
  [k in Exclude<keyof T, keyof U>]: T[k]
} & U

export type ImgData = WithOverriden<SrcImg>
export type Property = WithOverriden<SrcProp, { images: ImgData[] }>
export type PolicyOfNoShow = WithOverriden<SrcPolNo>
export type PolicyOfCancellation = WithOverriden<
  SrcPolCncl,
  { reference: Reference }
>

export type Venue = {
  property: Property
  policies: {
    noShowPolicies: PolicyOfNoShow[]
    cancellationPolicies: PolicyOfCancellation[]
  }
}

export const fetchData = async () => {
  const data = await import("../../data.json")
  return data.data as Venue[]
}
