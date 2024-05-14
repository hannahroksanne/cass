import { useControls } from 'leva'
import React from 'react'
import * as THREE from 'three'

const IDK = 20
const ASPECT_RATIO = window.innerWidth / window.innerHeight
const left = -IDK * ASPECT_RATIO
const right = IDK * ASPECT_RATIO

export const CAMERA = new THREE.OrthographicCamera(left, right, IDK, -IDK, 1, 1000)

CAMERA.position.set(20, 20, 20)
CAMERA.rotation.order = 'YXZ'
CAMERA.rotation.y = -Math.PI / 4
CAMERA.rotation.x = Math.atan(-1 / Math.sqrt(2))

export const useZoomControl = () => {
  const { zoomAmount } = useControls({
    zoomAmount: {
      value: 2,
      min: 0.1,
      max: 3,
      step: 0.1,
    },
  })

  React.useEffect(() => {
    CAMERA.zoom = zoomAmount
    CAMERA.updateProjectionMatrix()
  }, [zoomAmount])
}

window.CAMERA = CAMERA
