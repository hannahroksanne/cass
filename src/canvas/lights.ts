import * as THREE from 'three'

const AXES_HELPER = new THREE.AxesHelper(100)

export const LIGHTS = (() => {
  const AMBIENT = new THREE.AmbientLight('#ffffff')
  const POINT = new THREE.PointLight('#ffffff', 0.8)
  POINT.position.set(0, 50, 50)
  AXES_HELPER.name = 'AXES_HELPER'
  AMBIENT.name = 'AMBIENT_0'
  POINT.name = 'POINT_0'
  return { AMBIENT, POINT, AXES_HELPER }
})()

window.LIGHTS = LIGHTS
