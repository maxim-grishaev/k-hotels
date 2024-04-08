import { configureStore } from "@reduxjs/toolkit" // ...
import createSagaMiddleware from "redux-saga"
import { venueSlice } from "./venue/venueSlice"
import { rootSaga } from "./saga"

const sagaMiddleware = createSagaMiddleware()

export const createStore = () => {
  const store = configureStore({
    middleware: [sagaMiddleware],
    reducer: {
      // May help for investigartion and testing,
      // but should not be in production since it's basically a "legalised" memory leak.
      // history: createReducer([] as AnyAction[], (builder) =>
      //   builder.addDefaultCase((state, action: AnyAction) =>
      //     state.concat(action),
      //   ),
      // ),
      venues: venueSlice.reducer,
    },
  })
  sagaMiddleware.run(rootSaga)
  return store
}

export type AppStore = ReturnType<typeof createStore>
export type RootState = ReturnType<AppStore["getState"]>
export type AppDispatch = AppStore["dispatch"]
