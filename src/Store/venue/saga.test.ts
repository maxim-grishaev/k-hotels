import { call, put } from "redux-saga/effects"
import { Venue, fetchData } from "./fetchData"
import { getPropertiesEffect } from "./saga"
import { venueSlice } from "./venueSlice"

describe("getPropertiesEffect", () => {
  it("should fetch properties and dispatch success action", () => {
    const gen = getPropertiesEffect()
    const properties: Venue[] = []
    expect(gen.next().value).toEqual(call(fetchData))
    expect(gen.next(properties).value).toEqual(
      put(venueSlice.actions.success(properties)),
    )
  })

  it("should dispatch error action if fetch fails", () => {
    const gen = getPropertiesEffect()
    expect(gen.next().value).toEqual(call(fetchData))
    const error = new Error("error")
    expect(gen.throw(error).value).toEqual(put(venueSlice.actions.error(error)))
  })
})
