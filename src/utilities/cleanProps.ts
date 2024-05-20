export const cleanProps = (props, ...otherKeysToRemove) => {
  const { className, testId, ...otherProps } = props
  otherKeysToRemove.forEach((key) => delete otherProps[key])
  return otherProps
}
