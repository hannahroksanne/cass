import * as React from 'react'

// Hook for providing convenient, commonly needed state management
// for singleton values that can be toggled on and off, cleared,
// or simply overwritten.

export const useStateValue = (initialValue: any, inactiveValue = null) => {
  const [value, setValue] = React.useState(initialValue)

  const toggleValue = (newValue?: boolean) => {
    setValue((oldValue) => {
      if (newValue) return newValue
      return oldValue === value ? inactiveValue : value
    })
  }

  const clearValue = () => {
    setValue(inactiveValue)
  }

  return {
    value,
    toggleValue,
    setValue,
    clearValue,
  }
}
