import * as React from 'react'

export const Spacer = (props) => {
  const width = props.size || props.width
  const height = props.size || props.height
  const style = { display: 'flex', height: height, width: width }
  return <div style={style}> </div>
}

Spacer.defaultProps = {
  width: 0,
  height: 0,
  size: null,
}
