import React, { useEffect, useMemo, useRef } from 'react'
import { BoxGeometry, MeshBasicMaterial, Material } from 'three'
import { TextureLoader } from 'three/src/loaders/TextureLoader'
import { useFrame, useLoader } from '@react-three/fiber'
import { gridStore } from './stores/gridStore'
import range from 'array-range'

const useFloorTileMap = () => {
  const grid = gridStore.use()

  const map = React.useMemo(() => {
    const floorTilesCount = grid.getFloorTilesCount()
    const tilesRange = range(floorTilesCount)

    return tilesRange.map((voxelIndex) => {
      const levelIndex = 0 // Only one layer for floor grid.
      const rowIndex = Math.floor(voxelIndex % grid.width)
      const y = Math.floor(voxelIndex / grid.width)
      return { position: [rowIndex, 0, levelIndex] }
    })
  }, [grid.width, grid.depth])
}

export const FloorGridTiles = () => {
  const meshRef = useRef() as any
  const texture = useLoader(TextureLoader, '/public/textures/MetalTiles03_4k_AO.png')
  const tileGeometry = new BoxGeometry(1, 0.1, 1)
  const tilesCount = gridStore.helpers.getFloorTilesCount()

  const tileMaterial = new MeshBasicMaterial({
    color: '#ffffff',
    transparent: true,
    opacity: 0.5,
  }) as Material

  useFrame(() => {
    meshRef.current.instanceMatrix.needsUpdate = true
  })

  useEffect(() => {
    for (let i = 0; i < count; i++) {
      temp.position.set(Math.random(), Math.random(), Math.random())
      temp.updateMatrix()
      instancedMeshRef.current.setMatrixAt(i, temp.matrix)
    }
    // Update the instance
    instancedMeshRef.current.instanceMatrix.needsUpdate = true
  }, [])

  return (
    <instancedMesh ref={meshRef} args={[null, null, tilesCount]} castShadow receiveShadow>
      <bufferGeometry attach="geometry" />
      <boxGeometry />
      <meshPhongMaterial />
    </instancedMesh>
  )
}
