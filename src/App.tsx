import React from 'react'
import * as THREE from 'three'
import { RENDERER, animate } from './canvas/renderer'
import { CONTROLS } from './canvas/controls'
import { CAMERA, useZoomControl } from './canvas/camera'
import { MOUSE } from './canvas/mouse'
import { SCENE } from './canvas/scene'
import { LIGHTS } from './canvas/lights'
import { GRID } from './canvas/grid'
import { PIXEL_GRID } from './canvas/pixelGrid'
import { COLORS } from './canvas/colors'
import { BASE_GRID } from './canvas/baseGrid'

console.log({ BASE_GRID, PIXEL_GRID, RENDERER, MOUSE, CONTROLS, COLORS })

const geometry = new THREE.PlaneGeometry(128, 128, 128, 128)
const material = new THREE.MeshBasicMaterial({ wireframe: true, opacity: 0.015, transparent: true })
const grid = new THREE.Mesh(geometry, material)
grid.rotation.order = 'ZYX'
grid.rotation.y = -Math.PI / 2
grid.rotation.x = -Math.PI / 2
grid.name = 'UNDER_GRID'

SCENE.add(grid)
SCENE.add(LIGHTS.AMBIENT)
SCENE.add(LIGHTS.POINT)
SCENE.add(LIGHTS.AXES_HELPER)
SCENE.add(CAMERA)
SCENE.add(GRID)

const App = () => {
  useZoomControl()
  React.useEffect(animate, [])
  return null
}

export default App
