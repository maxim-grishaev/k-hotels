import { selectOneVenue } from "../Store/venue/selectors"
import { RootState } from "../Store/store"
import { Venue } from "../Store/venue/fetchData"
import { selectVenueBranch } from "../Store/selectVenueBranch"
import { useSelector } from "react-redux"

export const useOneVenue = (id?: string): Venue | undefined =>
  useSelector((state: RootState) =>
    id === undefined ? undefined : selectOneVenue(selectVenueBranch(state), id),
  )
