import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { makePropertiesRequest } from "../Store/property/actions"

export const usePropsFetcher = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(makePropertiesRequest())
  }, [dispatch])
}
