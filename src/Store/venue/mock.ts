import { PolicyCancellation, PolicyNoShow, Venue, Property } from "./fetchData"

export const createProperty = (id: string): Property => ({
  id,
  name: "property",
  addressLine1: "address",
  city: "city",
  country: "country",
  checkInTime: "checkInTime",
  checkOutTime: "checkOutTime",
  description: "description",
  images: [],
  phoneNumber: "phone",
  currency: "currency",
  timezone: "timezone",
  domain: "domain",
  email: "email",
  isAvailableForPartnerships: false,
  postcode: "postcode",
  rooms: 2,
  starRating: 3,
  status: false,
})

export const createPolicies = (): Venue["policies"] => ({
  cancellationPolicies: [],
  noShowPolicies: [],
})

export const createVenue = (id: string): Venue => ({
  property: createProperty(id),
  policies: createPolicies(),
})

export const createPolicyNoSHow = (id: string): PolicyNoShow => ({
  amount: 0,
  chargeType: "percentage",
  description: "description",
  name: "name",
  id,
})

export const createPolicyCancellation = (id: string): PolicyCancellation => ({
  id,
  amount: 0,
  chargeType: "percentage",
  reference: "prior-to-arrival",
  days: 1,
  hours: 1,
  name: "name",
  description: "description",
})
