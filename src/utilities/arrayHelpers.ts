const findDifferences = (target0: any[], target1: any[]) => {
  return target0.filter((id) => {
    return !target1.includes(id)
  })
}

export const findNewEntries = (oldArray: any[], newArray: any[]) => {
  return findDifferences(newArray, oldArray)
}

export const findRemovedEntries = (oldArray: any[], newArray: any[]) => {
  return findDifferences(oldArray, newArray)
}

type RemoveMatchingKeyValuesOptionsT<Type> = {
  target: Type[]
  key: string
  value: any
}

export const removeMatchingKeyValues = <Type>(options: RemoveMatchingKeyValuesOptionsT<Type>) => {
  return options.target.filter((item) => {
    return item[options.key] !== options.value
  })
}

export const findOneMatchingKeyValue = <Type>(options: RemoveMatchingKeyValuesOptionsT<Type>) => {
  return options.target.find((item) => {
    return item[options.key] === options.value
  })
}
