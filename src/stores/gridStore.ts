import { create } from 'zustand'

type StateT = {
  width: number
  height: number
  depth: number
  TILE_WIDTH: number
  TILE_DEPTH: number
  TILE_HEIGHT: number
  VOXEL_WIDTH: number
  VOXEL_DEPTH: number
  VOXEL_HEIGHT: number
}

const store = create<StateT>((set, get) => {
  const setGridWidth = (width: number) => {
    set((state: StateT) => {
      return { ...state, width }
    })
  }

  return {
    setGridWidth,
    width: 64,
    height: 64,
    depth: 64,
    TILE_WIDTH: 1,
    TILE_DEPTH: 1,
    TILE_HEIGHT: 0.1,
    VOXEL_WIDTH: 1,
    VOXEL_DEPTH: 1,
    VOXEL_HEIGHT: 1,
  }
})

export const gridStore = {
  use: store,

  get store() {
    return store.getState()
  },
}

window.gridStore = gridStore
