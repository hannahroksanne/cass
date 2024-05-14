import { throttle } from 'dettle'
import * as THREE from 'three'

export const MOUSE = new THREE.Vector2()

// Results in a value between -1 and 1.
const getRelativeCoordinates = (event: MouseEvent) => {
  return {
    x: (event.clientX / window.innerWidth) * 2 - 1,
    y: -(event.clientY / window.innerHeight) * 2 + 1,
  }
}

const handleMouseMove = (event: MouseEvent) => {
  const coordinates = getRelativeCoordinates(event)
  MOUSE.x = coordinates.x
  MOUSE.y = coordinates.y
  // console.log(MOUSE.x, MOUSE.y)
}

window.addEventListener('pointermove', handleMouseMove, false)
