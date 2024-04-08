import { BrowserRouter, Route, Routes, useParams } from "react-router-dom"
import { useVenuesFetcher } from "../hooks/useVenuesFetcher"
import { useSelector } from "react-redux"
import { LoadingPage } from "../Pages/LoadingPage"
import { NotFoundPage } from "../Pages/NotFoundPage"
import { VenuesListPage } from "../Pages/VenuesListPage"
import { VenuePage } from "../Pages/VenuePage"
import { selectVenuesLoadingState } from "../Store/selectors"

export const MainRouter = () => {
  useVenuesFetcher()
  const isLoading = useSelector(selectVenuesLoadingState)
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/property/:id"
          element={isLoading ? <LoadingPage /> : <OnePropertyRoute />}
        />
        <Route
          path="/"
          element={isLoading ? <LoadingPage /> : <AllPropertiesRoute />}
        />
        <Route path="*" element={<NotFoundPage>Path not found</NotFoundPage>} />
      </Routes>
    </BrowserRouter>
  )
}

export const AllPropertiesRoute = () => <VenuesListPage />

export const OnePropertyRoute = () => {
  let { id } = useParams()
  if (id === undefined) {
    return <NotFoundPage>Unknown property id: {String(id)}</NotFoundPage>
  }
  return <VenuePage id={id} />
}
