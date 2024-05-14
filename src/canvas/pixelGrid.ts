import * as THREE from 'three'
import { COLORS } from './colors'
import { TEXTURES } from './textures'

const ARRAY_OF_128 = Array(16).fill(undefined)
const CUBE_GEOMETRY = new THREE.BoxGeometry(1, 1, 1)
const INVISIBLE_MESH = new THREE.MeshBasicMaterial({ visible: false })
const VISIBLE_MESH = new THREE.MeshBasicMaterial({ color: 0xffffff })
const BOX_GEOMETRY = new THREE.BoxGeometry(1, 1, 0.1)
const INTERACTIVE_MESH = new THREE.Mesh(BOX_GEOMETRY, INVISIBLE_MESH)
const HOVERED_MESH = new THREE.Mesh(BOX_GEOMETRY, VISIBLE_MESH)

type LevelT = {
  index: number
  rows: RowT[]
}

type RowT = {
  levelIndex: number
  index: number
  pixels: Array<Pixel | undefined>
}

type Pixel = {
  color: THREE.Color
  geometry: THREE.BoxGeometry
  texture: THREE.Texture
  material: THREE.Material
  levelIndex: number
  rowIndex: number
  index: number
}

const createRow = (levelIndex: number) => {
  return ARRAY_OF_128.map((_, index) => {
    return {
      index,
      levelIndex,
      pixels: [...ARRAY_OF_128],
    }
  })
}

export const createLevel = (levelIndex: number, initialRows?: RowT[]): LevelT => {
  const rows = initialRows || createRow(levelIndex)

  return {
    index: levelIndex,
    rows,
  }
}

export const PIXEL_GRID = (() => {
  const LEVELS = ARRAY_OF_128.map((_, index) => {
    return createLevel(index)
  })

  const updatePixel = (options) => {
    const level = LEVELS[options.levelIndex]
    const row = level.rows[options.rowIndex]
    const pixel = row.pixels[options.pixelIndex]

    // TODO: update pixel
  }

  const deletePixel = (pixel) => {
    const level = LEVELS[pixel.levelIndex]
    const row = level.rows[pixel.rowIndex]
    row.pixels[pixel.index] = undefined
  }

  const setPixelColor = (pixel: Pixel, color: THREE.Color) => {
    pixel.material.color.set(color)
  }

  const createPixel = (levelIndex: number, rowIndex: number, pixelIndex: number) => {
    const color = COLORS.WHITE
    const texture = TEXTURES.METAL[0]
    const geometry = CUBE_GEOMETRY
    const material = new THREE.MeshBasicMaterial({ map: texture })
    const mesh = new THREE.Mesh(CUBE_GEOMETRY, material)

    return {
      mesh,
      color,
      texture,
      material,
      geometry,
      levelIndex,
      rowIndex,
      pixelIndex,
    }
  }

  return {
    LEVELS,
    createPixel,
    deletePixel,
    setPixelColor,
  }
})()

window.PIXEL_GRID = PIXEL_GRID
