import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { CAMERA } from './camera'
import { RENDERER } from './renderer'

export const CONTROLS = new OrbitControls(CAMERA, RENDERER.domElement)
window.CONTROLS = CONTROLS
console.log({ CAMERA, RENDERER })
CONTROLS.enableZoom = true
CONTROLS.enablePan = true
CONTROLS.enableRotate = true
CONTROLS.maxPolarAngle = Math.PI / 2
