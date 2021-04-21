import { useState, useMemo } from 'react'

export const useInput = (initialState) => {
  const [state, setState] = useState(initialState)

  const handlers = useMemo(
    () => ({
      handleInputChange: (e) => {
        setState(e.target.value)
      },
      resetInput: () => {
        setState(initialState)
      }
    }),
    [initialState]
  )

  return [state, handlers]
}
