import { PropertyState } from "./reducer"

export const selectAllProperties = (state: PropertyState) => state.properties

export const selectOneProperty = (state: PropertyState, propertyId: string) => {
  const properties = selectAllProperties(state)
  if (propertyId === undefined) {
    return undefined
  }
  return properties.find((property) => property.id === propertyId)
}
