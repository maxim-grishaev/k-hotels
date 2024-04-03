import { Provider } from "react-redux"
import { MainRouter } from "./Router/MainRouter"
import { createStore } from "./Store/store"
import { StrictMode } from "react"
import "./index.css"

export function App() {
  return (
    <StrictMode>
      <Provider store={createStore()}>
        <MainRouter />
      </Provider>
    </StrictMode>
  )
}
