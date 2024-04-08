import { configureStore } from "@reduxjs/toolkit" // ...
import createSagaMiddleware from "redux-saga"
import { reducer as propertyReducer } from "./property/reducer"
import { rootSaga } from "./saga"

const sagaMiddleware = createSagaMiddleware()

export const createStore = () => {
  const store = configureStore({
    middleware: [sagaMiddleware],
    reducer: {
      property: propertyReducer,
    },
  })
  sagaMiddleware.run(rootSaga)
  return store
}

export type AppStore = ReturnType<typeof createStore>
export type RootState = ReturnType<AppStore["getState"]>
export type AppDispatch = AppStore["dispatch"]
