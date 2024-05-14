import * as THREE from 'three'
import { N128 } from '../constants'

export const GRID = (() => {
  const resolution = new THREE.Vector2(N128, N128)
  const isMobile = window.innerWidth < 768
  const grid = new THREE.GridHelper(resolution.x, resolution.y, '#ff002b', '#9c9c9c')
  const RES0 = resolution.x / 2
  const RES1 = resolution.y / 2
  grid.position.set(0, 0, 0)
  grid.material.transparent = false
  grid.material.opacity = isMobile ? 0 : 0
  grid.name = 'MAIN_GRID'
  return grid
})()
