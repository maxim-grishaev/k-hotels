import { Venue } from "../Store/venue/fetchData"

export const getPropertyAddress = (property: Venue["property"]) =>
  `${property.addressLine1}, ${property.postcode} ${property.city}, ${property.country}`
