import data from "../../data.json"

type Data = typeof data.data
export type Venue = Data[number]
export type VenuePropertyInfo = Venue["property"]
export type VenuePoliciesDict = Venue["policies"]
export type PolicyDataItem = VenuePoliciesDict[keyof VenuePoliciesDict][number]

export const fetchData = async (): Promise<Venue[]> => {
  const data = await import("../../data.json")
  return data.data.map((it) => it)
}
