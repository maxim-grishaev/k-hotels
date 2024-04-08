import { useCallback, useState } from "react"
import { PolicyOfCancellation } from "../Store/venue/fetchData"
import { useUpdatePolicyOfCancellation } from "./useUpdatePolicyOf"

export const usePolicyEditor = ({
  propertyId,
  policy,
}: {
  propertyId: string
  policy: PolicyOfCancellation
}) => {
  const savePolicy = useUpdatePolicyOfCancellation({
    propertyId,
    policyId: policy.id,
  })
  const [isEditing, setEditing] = useState(false)
  const [editedPolicy, setEditedPolicy] = useState({ ...policy })

  const onChange = useCallback((newValues: Partial<PolicyOfCancellation>) => {
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
