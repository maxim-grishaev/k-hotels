import { VenuePropertyInfo } from "../Store/venue/fetchData"

export const getPropertyAddress = (property: VenuePropertyInfo) =>
  `${property.addressLine1}, ${property.postcode} ${property.city}, ${property.country}`
