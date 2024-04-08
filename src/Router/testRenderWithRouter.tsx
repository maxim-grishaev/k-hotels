import { act, render } from "@testing-library/react"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import { createTestStoreProvider } from "../Store/createTestStoreProvider"
import { AppStore } from "../Store/store"

const Noop = ({ children }: { children: React.ReactNode }) => <>{children}</>

export const testRenderWithRouter = async (
  ui: React.ReactElement,
  opts: {
    path?: string
    store?: AppStore
  } = {},
) => {
  const StoreProv = opts.store ? createTestStoreProvider(opts.store) : Noop
  return await act(async () => {
    render(ui, {
      wrapper: ({ children }) => (
        <StoreProv>
          <BrowserRouter>
            <Routes>
              <Route path={opts.path ?? "*"} element={children} />
            </Routes>
          </BrowserRouter>
        </StoreProv>
      ),
    })
  })
}
