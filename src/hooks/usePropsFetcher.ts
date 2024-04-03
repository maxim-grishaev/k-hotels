import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { venueSlice } from "../Store/venue/venueSlice"

export const usePropsFetcher = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(venueSlice.actions.requestStart())
  }, [dispatch])
}
