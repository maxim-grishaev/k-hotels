import { act, render } from "@testing-library/react"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import { createTestStoreWrapper } from "../Store/createTestStoreWrapper"
import { AppStore } from "../Store/store"

const Noop = ({ children }: { children: React.ReactNode }) => <>{children}</>

export const testRenderWithRouter = async (
  ui: React.ReactElement,
  opts: {
    path?: string
    store?: AppStore
  } = {},
) => {
  const StoreProv = opts.store ? createTestStoreWrapper(opts.store) : Noop
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
