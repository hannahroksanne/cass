export const removeEmptyValues = (target: AnyObjectT) => {
  const withoutEmptyValues = {}

  for (const key in target) {
    if (target[key]) {
      withoutEmptyValues[key] = target[key]
    }
  }

  return withoutEmptyValues
}
