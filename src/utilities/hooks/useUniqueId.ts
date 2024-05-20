import * as React from 'react'
import { nanoid } from 'nanoid'

export const useUniqueId = (): string => {
  const id = React.useMemo(nanoid, [])
  return id
}
