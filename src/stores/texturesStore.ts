import { create } from 'zustand'
import * as THREE from 'three'

type StateT = {
  textures: Record<string, THREE.Texture>
  addTexture: (texture: THREE.Texture) => void
}

const store = create<StateT>((set, get) => {
  const addTexture = (texture: THREE.Texture) => {
    set((state: StateT) => {
      const name = texture.userData.name
      return { ...state, textures: { ...state.textures, [name]: texture } }
    })
  }

  return {
    addTexture,
    textures: {},
  }
})

export const texturesStore = {
  use: store,

  get state() {
    return store.getState()
  },
}

window.texturesStore = texturesStore
