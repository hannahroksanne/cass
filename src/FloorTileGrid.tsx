// src/components/FloorTileGrid.jsx
import React, { useRef, useState, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Instances, Instance } from '@react-three/drei'
import * as THREE from 'three'

const numTiles = 64
const tileSize = { x: 1, y: 1, z: 1 }

export const FloorTileGrid = () => {
  const [hoveredTile, setHoveredTile] = useState(null)
  const [clickedTiles, setClickedTiles] = useState(new Set())

  const positions = useMemo(() => {
    const posArray = []
    for (let i = 0; i < numTiles; i++) {
      for (let j = 0; j < numTiles; j++) {
        posArray.push([i * tileSize.x, 0, j * tileSize.z])
      }
    }
    return posArray
  }, [numTiles, tileSize])

  const handlePointerMove = (e, index) => {
    setHoveredTile(index)
  }

  const handlePointerOut = () => {
    setHoveredTile(null)
  }

  const handleClick = (index) => {
    console.log('clicked', index)
  }

  return (
    <Instances limit={numTiles * numTiles} castShadow receiveShadow>
      <planeGeometry args={[tileSize.x, tileSize.z, tileSize.y]} />
      <meshStandardMaterial color="grey" />
      {positions.map((position, index) => (
        <Instance
          key={index}
          position={position}
          onClick={() => handleClick(index)}
          foo={console.log({ position, index })}
          color="grey"
          // onPointerMove={(e) => handlePointerMove(e, index)}
          // onPointerOut={handlePointerOut}
          // onClick={() => handleClick(index)}
          // color={hoveredTile === index ? 'lightblue' : clickedTiles.has(index) ? 'blue' : 'grey'}
        />
      ))}
    </Instances>
  )
}
