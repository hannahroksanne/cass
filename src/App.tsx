import './styles/reset.css'
import './styles/themes.css'
import * as React from 'react'
import * as THREE from 'three'
import { Canvas, useFrame, useLoader } from '@react-three/fiber'

import {
  Environment,
  Grid,
  Lightformer,
  OrbitControls,
  SoftShadows,
  useTexture,
  MeshWobbleMaterial,
  ContactShadows,
} from '@react-three/drei'

import { useStateValue } from './utilities/hooks'
import range from 'array-range'
import { gridStore } from './stores/gridStore'
import { texturesStore } from './stores/texturesStore'

const ROOT_ELEMENT = document.getElementById('root')
const TILE_MATERIAL = new THREE.MeshLambertMaterial({ color: 'pink' })
const TILE_GEOMETRY = new THREE.BoxGeometry(1, 1, 0.25)
// const DEFAULT_CAMERA_POSITION = new THREE.Vector3(0, 1.5, 14)
// const CAMERA_OPTIONS = { position: DEFAULT_CAMERA_POSITION, fov: 60 }
// THREE.ColorManagement.enabled = true

const getRandomNumberBetween = (min, max) => {
  return Math.floor(Math.random() * (max - min) + min)
}

const createRow = (state, rowIndex) => {
  state.rows.push({ index: rowIndex, tiles: [] })
}

const COLORS = {
  HOT_PINK: new THREE.Color('#ff007f'),
  LIGHT_BLUE: new THREE.Color('#00f9ff'),
  LIGHT_GREEN: new THREE.Color('#00ff9c'),
  LIGHT_ORANGE: new THREE.Color('#ff9c00'),
  LIGHT_PURPLE: new THREE.Color('#9c00ff'),
  LIGHT_RED: new THREE.Color('#ff0000'),
  LIGHT_YELLOW: new THREE.Color('#ff9c00'),
  BLACK: new THREE.Color('#000000'),

  BRAND_YELLOW0: new THREE.Color('#ffface'),
  BRAND_YELLOW1: new THREE.Color('#ffed47'),
  BRAND_YELLOW2: new THREE.Color('#eed600'),
  BRAND_GREEN0: new THREE.Color('#f0fddb'),
  BRAND_GREEN1: new THREE.Color('#cdf980'),
  BRAND_GREEN2: new THREE.Color('#99eb0c'),
  BRAND_PURPLE0: new THREE.Color('#faf7ff'),
  BRAND_PURPLE1: new THREE.Color('#e0cdfe'),
  BRAND_PURPLE2: new THREE.Color('#b283fd'),
}

const SHAPES = {
  TILE0: new THREE.BoxGeometry(1, 0.25, 1),
}

const MATERIALS = {
  BASIC0: new THREE.MeshBasicMaterial({ color: COLORS.LIGHT_BLUE }),
  PHONG0: new THREE.MeshPhongMaterial({ color: COLORS.HOT_PINK, transparent: true }),
  PHONG1: new THREE.MeshPhongMaterial({ color: COLORS.BRAND_YELLOW2, shininess: 0, flatShading: false }),
}

const TexturesLoader = (props) => {
  const textures = texturesStore.use()
  const loadedTextures = useLoader(THREE.TextureLoader, [...props.urls])
  const loadedTexturesCount = loadedTextures.length

  React.useEffect(() => {
    if (loadedTexturesCount === 0) return

    loadedTextures.forEach((texture, index) => {
      texture.userData.name = texture.image.src.split('/').pop()
      texture.userData.loadedDateTime = Date.now()
      textures.addTexture(texture)
    })
  }, [loadedTexturesCount])

  return null
}

window.idsMap = {}
const INSTANCE_COLOR_REFERENCE = new THREE.Color()
const INSTANCE_MATRIX_REFERENCE = new THREE.Matrix4()

function FloorTileGrid(props) {
  const instancedMeshRef = React.useRef<THREE.InstancedMesh>()
  const [hoveredInstanceId, setHoveredInstanceId] = React.useState()
  const grid = gridStore.use()
  const TILE_COUNT = grid.width * grid.depth

  React.useLayoutEffect(() => {
    if (!instancedMeshRef.current) return

    const reference = new THREE.Object3D()
    const rowIndexes = range(grid.width)
    const tileIndexes = range(grid.depth)

    rowIndexes.forEach((rowIndex) => {
      tileIndexes.forEach((tileIndex) => {
        const instanceId = rowIndex * grid.depth + tileIndex
        reference.position.set(rowIndex, 0.5, tileIndex)
        reference.updateMatrix()
        instancedMeshRef.current.setMatrixAt(instanceId, reference.matrix)
        instancedMeshRef.current.setColorAt(instanceId, COLORS.LIGHT_BLUE)
      })
    })

    instancedMeshRef.current.instanceMatrix.needsUpdate = true
    instancedMeshRef.current.instanceColor.needsUpdate = true
  }, [grid.width, grid.depth])

  const lastHoveredInstanceId = React.useRef()

  useFrame(() => {
    if (lastHoveredInstanceId.current !== undefined && lastHoveredInstanceId.current !== hoveredInstanceId) {
      const id = lastHoveredInstanceId.current
      if (instancedMeshRef.current) {
        instancedMeshRef.current.setColorAt(id, COLORS.LIGHT_BLUE)
        instancedMeshRef.current.instanceColor.needsUpdate = true
      }
      lastHoveredInstanceId.current = undefined
    }

    if (hoveredInstanceId !== undefined && lastHoveredInstanceId.current !== hoveredInstanceId) {
      if (instancedMeshRef.current) {
        instancedMeshRef.current.setColorAt(hoveredInstanceId, COLORS.BLACK)
        instancedMeshRef.current.instanceColor.needsUpdate = true
        lastHoveredInstanceId.current = hoveredInstanceId
      }
    }
  })

  return (
    <>
      <instancedMesh
        ref={instancedMeshRef}
        args={[SHAPES.TILE0, MATERIALS.BASIC0, TILE_COUNT]}
        castShadow
        receiveShadow
        onPointerMissed={() => console.warn('missed me')}
        onPointerOver={(e) => (e.stopPropagation(), setHoveredInstanceId(e.instanceId))}
        onPointerOut={(e) => setHoveredInstanceId(undefined)}
      />
    </>
  )
}

const getTilePosition = (index) => {
  const positionX = (index % 64) + index * 0.05
  const positionZ = Math.floor(index / 64) + index * 0.05
  return new THREE.Vector3(positionX, 0.5 + index * 0.05, positionZ)
}

const OrbitCameraControls = () => {
  const controlsRef = React.useRef()

  return (
    <OrbitControls
      ref={controlsRef}
      enableDamping={true}
      dampingFactor={0.1}
      minZoom={0}
      zoomToCursor={true}
      screenSpacePanning
      minPolarAngle={Math.PI / 4}
      maxPolarAngle={Math.PI / 2}
      minDistance={5}
      maxDistance={200}
    />
  )
}

const IsometricGridFloor = () => {
  const gridRef = React.useRef()

  return (
    <Grid
      ref={gridRef}
      position={[0.5, 0, 0]}
      args={[128, 128]} // size
      cellSize={1}
      cellThickness={1}
      sectionSize={8}
      sectionThickness={2}
      fadeDistance={55}
      fadeStrength={4}
      followCamera={false}
      infiniteGrid
      cellColor={'#f8ff25'}
      sectionColor={'#eb1563'}
    />
  )
}

const DEFAULT_TEXTURE_URLS = [
  '/public/textures/MetalTiles03_4k_AO.png',
  '/public/textures/MetalTiles03_4K_BaseColor.png',
  '/public/textures/MetalTiles03_4K_Height.png',
  '/public/textures/MetalTiles03_4K_Normal.png',
  '/public/textures/MetalTiles03_4K_Roughness.png',
  '/public/textures/MetalTiles03_4K_Metallic.png',
]

const getTextureNamesFromUrls = (urls) => {
  return urls.map((url) => url.split('/').pop())
}

function App() {
  return (
    <Canvas
      dpr={[1, 2]}
      orthographic
      camera={{
        position: [-10, 10, 10],
        zoom: 100,
        rotation: new THREE.Euler(Math.atan(-1 / Math.sqrt(2)), -Math.PI / 4, 0),
      }}
      eventPrefix="client"
      eventSource={document.body}
    >
      <TexturesLoader urls={DEFAULT_TEXTURE_URLS} />
      <pointLight position={[10, 10, 10]} />
      <ContactShadows frames={1} position={[0, -0.5, 0]} scale={10} opacity={0.4} far={1} blur={2} />
      <ambientLight intensity={0.1} />
      <pointLight position={[10, 10, 10]} />
      <ambientLight color="purple" intensity={0.1} />
      <directionalLight color="red" position={[0, 0, 5]} />
      <sphereGeometry args={[0.5, 32, 32]} />
      <meshBasicMaterial attach="material" vertexColors={true} />
      {/* <fog attach="fog" args={['black', 0, 20]} /> */}
      <pointLight color="green" position={[10, -10, -20]} intensity={0.25} />
      <SoftShadows samples={3} />
      <Environment preset="forest" blur={1000} backgroundBlurriness={1000} />
      <OrbitCameraControls />
      <IsometricGridFloor />
      <FloorTileGrid />
    </Canvas>
  )
}

export default App
