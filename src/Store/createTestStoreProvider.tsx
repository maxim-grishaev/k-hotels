import { Provider } from "react-redux"
import { createStore } from "./store"

export const createTestStoreProvider =
  (store = createStore()) =>
  (props: { children: React.ReactNode }) =>
    <Provider store={store}>{props.children}</Provider>
