// Useful for error logging and tracking down the exact source of
// issues more easily and quickly.
export const getCallerFileName = () => {
  const error = new Error()
  const stackLines = error.stack.split('\n')
  const callerLine = stackLines[3]
  const sliceIndex0 = callerLine.indexOf('at ') + 3
  const sliceIndex1 = callerLine.indexOf(' (')
  const callerFileName = callerLine.slice(sliceIndex0, sliceIndex1).split(':')[0]
  return callerFileName
}

export const logCallerFileName = () => {
  const callerFileName = getCallerFileName()
  console.log(callerFileName)
}
