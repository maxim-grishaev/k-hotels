import { RootState } from "../Store/store"
import { Property } from "../Store/venue/fetchData"
import { useSelector } from "react-redux"
import { selectOneVenueByRoot } from "../Store/selectors"

export const useOneProperty = (id?: string): Property | undefined =>
  useSelector((root: RootState) => selectOneVenueByRoot(root, id))?.property
