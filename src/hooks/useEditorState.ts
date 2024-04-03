import { useCallback, useState } from "react"

export const useEditorState = <T>(value: T, onSave: (val: T) => void) => {
  const [isEditing, setEditing] = useState(false)
  const [editedData, setEditedData] = useState({ ...value })

  const onChange = useCallback((newValues: Partial<T>) => {
    setEditedData((editedPolicy) => {
      return { ...editedPolicy, ...newValues }
    })
  }, [])

  return {
    isEditing,
    editedData,
    onChange,

    /**
     * Not using useCallback here because it may be counterproductive:
     * editedData updates very often, and memoisation is not free.
     *
     * Use it externally if needed: `const memoSave = useCallback(edit.save, [editedData])`
     */
    save: () => {
      setEditing(false)
      onSave(editedData)
    },

    reset: useCallback(() => {
      setEditing(false)
      setEditedData({ ...value })
    }, [value]),

    edit: useCallback(() => {
      setEditing(true)
    }, []),
  }
}
