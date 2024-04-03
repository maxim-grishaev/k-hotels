import { act, renderHook } from "@testing-library/react"
import { createTestStoreProvider } from "../Store/createTestStoreProvider"
import { createStore } from "../Store/store"
import { populateVenue } from "../Store/venue/mock"
import { venueSlice } from "../Store/venue/venueSlice"
import { useEditorState } from "./useEditorState"

describe("usePolicyEditor", () => {
  it("should return the correct values", () => {
    const store = createStore()

    const ven = populateVenue({
      propertyId: "1",
      policyCancellationId: "2",
      policyNoShowId: "3",
    })
    store.dispatch(venueSlice.actions.success([ven]))

    const mockOnSave = jest.fn()
    const pol = ven.policies.cancellationPolicies[0]
    const view = renderHook(() => useEditorState(pol, mockOnSave), {
      wrapper: createTestStoreProvider(store),
    })

    expect(view.result.current.isEditing).toBe(false)
    expect(view.result.current.editedData).toEqual(pol)
    // Should be edited not affecting the original
    expect(view.result.current.editedData).not.toBe(pol)

    act(() => {
      view.result.current.edit()
      view.result.current.onChange({ amount: 42 })
    })

    expect(view.result.current.isEditing).toBe(true)
    expect(view.result.current.editedData.amount).toBe(42)
    expect(mockOnSave).toBeCalledTimes(0)

    act(() => {
      view.result.current.save()
    })

    expect(view.result.current.isEditing).toBe(false)
    expect(mockOnSave).toBeCalledTimes(1)
    expect(mockOnSave).toBeCalledWith({ ...pol, amount: 42 })
  })
})
