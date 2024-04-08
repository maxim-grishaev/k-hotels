import {
  PolicyOfCancellation,
  PolicyOfNoShow,
  Venue,
  Property,
} from "./fetchData"

export const createProperty = (id: string): Property => ({
  id,
  name: `property ${id}`,
  addressLine1: `addressLine1 ${id}`,
  city: `city ${id}`,
  country: `country ${id}`,
  checkInTime: `checkInTime ${id}`,
  checkOutTime: `checkOutTime ${id}`,
  description: `description ${id}`,
  images: [],
  phoneNumber: `phoneNumber ${id}`,
  currency: `currency ${id}`,
  timezone: `timezone ${id}`,
  domain: `domain ${id}`,
  email: `email ${id}`,
  isAvailableForPartnerships: false,
  postcode: `postcode ${id}`,
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

export const createPolicyNoShow = (id: string): PolicyOfNoShow => ({
  amount: 0,
  chargeType: "percentage",
  description: `description ${id}`,
  name: `name ${id}`,
  id,
})

export const createPolicyCancellation = (id: string): PolicyOfCancellation => ({
  id,
  amount: 0,
  chargeType: "percentage",
  reference: "prior-to-arrival",
  days: 1,
  hours: 1,
  name: `name ${id}`,
  description: `description ${id}`,
})

export const populateVenue = (
  ids: {
    propertyId?: string
    policyNoShowId?: string
    policyCancellationId?: string
  } = {},
) => {
  const ven = createVenue(ids.propertyId ?? "1")

  const polN = createPolicyNoShow(ids.policyNoShowId ?? "2")
  ven.policies.noShowPolicies.push(polN)

  const polC = createPolicyCancellation(ids.policyCancellationId ?? "3")
  ven.policies.cancellationPolicies.push(polC)

  return ven
}
