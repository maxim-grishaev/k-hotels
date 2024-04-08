import data from "../../data.json"

type Data = typeof data.data
export type DataItem = Data[number]
export type DataProperty = DataItem["property"]
export type DataPolicies = DataItem["policies"]

export const fetchData = async (): Promise<DataProperty[]> => {
  const data = await import("../../data.json")
  return data.data.map((it) => it.property)
}
