import * as THREE from 'three'

const load = (url: string) => new THREE.TextureLoader().load(url)

const METAL = [
  load('textures/MetalTiles03_4K_Height.png'),
  load('textures/MetalTiles03_4K_Roughness.png'),
  load('textures/MetalTiles03_4K_Normal.png'),
]

export const TEXTURES = { METAL }

window.TEXTURES = TEXTURES
