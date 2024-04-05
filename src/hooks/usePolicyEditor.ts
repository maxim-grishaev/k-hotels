import { useCallback, useState } from "react"
import { PolicyCancellation } from "../Store/venue/fetchData"
import { usePolicyCancellationCallback } from "./usePolicyUpdateCallback"

export const usePolicyEditor = ({
  propertyId,
  policy,
}: {
  propertyId: string
  policy: PolicyCancellation
}) => {
  const savePolicy = usePolicyCancellationCallback({
    propertyId,
    policyId: policy.id,
  })
  const [isEditing, setEditing] = useState(false)
  const [editedPolicy, setEditedPolicy] = useState({ ...policy })

  const onChange = useCallback((newValues: Partial<PolicyCancellation>) => {
    setEditedPolicy((editedPolicy) => {
      return { ...editedPolicy, ...newValues }
    })
  }, [])

  return {
    isEditing,
    editedPolicy,
    onChange,

    save: () => {
      savePolicy(editedPolicy)
      setEditing(false)
    },

    reset: useCallback(() => {
      setEditing(false)
      setEditedPolicy({ ...policy })
    }, [policy]),

    edit: useCallback(() => {
      setEditing(true)
    }, []),
  }
}
