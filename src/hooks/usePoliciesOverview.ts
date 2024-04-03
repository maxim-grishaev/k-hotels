import { useSelector } from "react-redux"
import { selectVenueBranch } from "../Store/selectors"
import { RootState } from "../Store/store"
import { Property } from "../Store/venue/fetchData"
import { selectOneVenue } from "../Store/venue/selectors"

export type PoliciesOverview = {
  noShow: string[]
  cancellation: string[]
  currency: Property["currency"]
}

export const usePoliciesOverview = (propertyId: string): PoliciesOverview => {
  const ven = useSelector((state: RootState) =>
    selectOneVenue(selectVenueBranch(state), propertyId),
  )
  if (!ven) {
    return { noShow: [], cancellation: [], currency: "" }
  }
  return {
    noShow: ven.policies.noShowPolicies.map((it) => it.id),
    cancellation: ven.policies.cancellationPolicies.map((it) => it.id),
    currency: ven.property.currency,
  }
}
