import * as THREE from 'three'
import { RAYCASTER } from './renderer'
import { SCENE } from './scene'
import { createLevel } from './pixelGrid'
import { ARRAY_OF_128, N128 } from '../constants'
import { debounce, throttle } from 'dettle'
import { COLORS } from './colors'

export let ACTIVE_BASEBOX = null as THREE.Intersection | null

const INVISIBLE_MESH = new THREE.MeshBasicMaterial({ transparent: true, opacity: 0 })
const VISIBLE_MESH = new THREE.MeshBasicMaterial({ color: 0xffffff })
const BOX_GEOMETRY = new THREE.BoxGeometry(1, 0.05, 1)
const INTERACTIVE_MESH = new THREE.Mesh(BOX_GEOMETRY, INVISIBLE_MESH)
const HOVERED_MESH = new THREE.Mesh(BOX_GEOMETRY, VISIBLE_MESH)

const createRow = (rowIndex: number) => {
  const boxesGroup = new THREE.Group()

  const boxes = ARRAY_OF_128.map((_, index) => {
    const random = new THREE.MeshLambertMaterial({ color: Math.random() * 0xffffff })
    const box = new THREE.Mesh(BOX_GEOMETRY, INVISIBLE_MESH)
    const xPosition = rowIndex + 0.5 - N128 / 2
    const zPosition = index + 0.5 - N128 / 2
    const yPosition = 0
    box.position.set(xPosition, yPosition, zPosition)
    box.name = 'base_box'
    boxesGroup.add(box)
    return box
  })

  SCENE.add(boxesGroup)

  return {
    index: rowIndex,
    boxesGroup,
    boxes,
  }
}

export const createBase = () => {
  const rowsGroup = new THREE.Group()

  const rows = ARRAY_OF_128.map((_, index) => {
    const row = createRow(index)
    rowsGroup.add(row.boxesGroup)
    return row
  })

  SCENE.add(rowsGroup)

  return {
    rowsGroup,
    rows,
  }
}

export const BASE_GRID = (() => {
  const base = createBase()

  console.log({ base })

  const d = throttle((name, mainIntersect) => console.log(name, mainIntersect), 1000)

  const deactivateBaseBox = (baseBox: THREE.Intersection) => {
    const mesh = baseBox.object as THREE.Mesh
    mesh.material = INVISIBLE_MESH
    ACTIVE_BASEBOX = null
  }

  const activateBaseBox = (baseBox: THREE.Intersection) => {
    const mesh = baseBox.object as THREE.Mesh
    mesh.material = VISIBLE_MESH
    ACTIVE_BASEBOX = baseBox
  }

  const handleIntersects = (hoveredObject: THREE.Intersection, intersects: THREE.Intersection[]) => {
    const isIntersectBaseBox = hoveredObject?.object.name === 'base_box'
    const isSameIntersect = ACTIVE_BASEBOX === hoveredObject

    // If we are hovering over a baseBox and we already
    // have an active baseBox, and that baseBox is the
    // already active one, there is nothing for us to do.
    if (isIntersectBaseBox && ACTIVE_BASEBOX && isSameIntersect) return console.log(0)

    // If we are hovering over a baseBox and there is not a
    // currently active baseBox, activate the the hovered one.
    if (isIntersectBaseBox && !ACTIVE_BASEBOX) {
      console.log(1)
      activateBaseBox(hoveredObject)
      return
    }

    // If we are hovering over a baseBox and there is an active
    // baseBox, but it is not the same as the hovered baseBox,
    // deactivate the active baseBox and activate the hovered one.
    if (isIntersectBaseBox && ACTIVE_BASEBOX && !isSameIntersect) {
      console.log(2, { isIntersectBaseBox, isSameIntersect, ACTIVE_BASEBOX, hoveredObject })
      deactivateBaseBox(hoveredObject)
      activateBaseBox(hoveredObject)
      return
    }
  }

  return {
    base,
    handleIntersects,
  }
})()
