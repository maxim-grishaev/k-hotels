import { BrowserRouter, Route, Routes, useParams } from "react-router-dom"
import { usePropsFetcher } from "../hooks/usePropsFetcher"
import { useSelector } from "react-redux"
import { RootState } from "../Store/store"
import { LoadingPage } from "../Pages/LoadingPage"
import { NotFoundPage } from "../Pages/NotFoundPage"
import { PropertiesListPage } from "../Pages/PropertiesListPage"
import { PropertyPage } from "../Pages/PropertyPage"

export const OnePropertyRoute = () => {
  let { id } = useParams()
  if (id === undefined) {
    return <NotFoundPage>Unknown property id: {String(id)}</NotFoundPage>
  }
  return <PropertyPage id={id} />
}

export const MainRouter = () => {
  usePropsFetcher()
  const isLoading = useSelector((state: RootState) => state.property.loading)
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/property/:id"
          element={isLoading ? <LoadingPage /> : <OnePropertyRoute />}
        />
        <Route
          path="/"
          element={isLoading ? <LoadingPage /> : <PropertiesListPage />}
        />
        <Route path="*" element={<NotFoundPage>Path not found</NotFoundPage>} />
      </Routes>
    </BrowserRouter>
  )
}
