import * as THREE from 'three'
import Stats from 'three/examples/jsm/libs/stats.module'
import { CAMERA } from './camera'
import { SCENE } from './scene'
import { MOUSE } from './mouse'
import { BASE_GRID } from './baseGrid'

export const rendererStore = new Map()

export const RAYCASTER = new THREE.Raycaster()
const stats = new Stats()
document.body.appendChild(stats.dom)

export const RENDERER = new THREE.WebGLRenderer()
RENDERER.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(RENDERER.domElement)

const getObjectNames = (intersects) => {
  return intersects.map((intersect) => intersect.object.name)
}

const getObjectTypes = (intersects) => {
  return intersects.map((intersect) => intersect.object.type)
}

const IGNORED_TYPES = ['GridHelper', 'AxesHelper', 'Scene']
const OK_NAMES = ['base_box']

const getIntersects = () => {
  RAYCASTER.setFromCamera(MOUSE, CAMERA)
  const intersects = RAYCASTER.intersectObjects(SCENE.children, true)
  const filteredIntersects = intersects.filter((intersect) => OK_NAMES.includes(intersect.object.name))
  return filteredIntersects
}

export const render = () => {
  RENDERER.render(SCENE, CAMERA)
  const intersects = getIntersects()
  const mainIntersect = intersects[0]

  BASE_GRID.handleIntersects(mainIntersect, intersects)

  // if (intersects.length > 0) {
  //   const intersected = rendererStore.get('intersected')
  //   const newIntersected = intersects[0].object
  //   const hasIntersectedChanged = intersected !== intersects[0].object

  // intersects[i].object.material.color.set(0xff0000)
  // console.log({ hasIntersectedChanged, intersected, newIntersected })
  //   if (hasIntersectedChanged && intersected) {
  //     intersected.material.emissive.setHex(intersected.currentHex)
  //   }

  //   if (hasIntersectedChanged) {
  //     rendererStore.set('intersected', intersects[0].object)
  //     intersects[0].object.currentHex = intersects[0].object.material.emissive.getHex()
  //     intersects[0].object.material.emissive.setHex(0xff0000)
  //   }
  // }

  stats.update()
}

window.RENDERER = RENDERER
window.render = render

// export const render = () => {
//   RAYCASTER.setFromCamera(MOUSE, CAMERA)
//   const intersects = RAYCASTER.intersectObjects(SCENE.children)
//   RENDERER.render(SCENE, CAMERA)
// }

export const animate = () => {
  requestAnimationFrame(animate)
  render()
}
