import data from "../../data.json"

type Data = typeof data.data
export type Venue = Data[number]
export type VenueProperty = Venue["property"]
export type VenuePolicies = Venue["policies"]

export const fetchData = async (): Promise<Venue[]> => {
  const data = await import("../../data.json")
  return data.data.map((it) => it)
}
