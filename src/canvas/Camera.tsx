import React from 'react'
import * as THREE from 'three'
import { Canvas, useThree } from '@react-three/fiber'
import { CameraControls, Environment, OrthographicCamera } from '@react-three/drei'
import range from 'array-range'
import { N128 } from '../constants'

export const Camera = () => {
  const cameraRef = React.useRef<THREE.OrthographicCamera>(null!)
  const { size } = useThree()
  const aspectRatio = size.width / size.height
  const left = -20 * aspectRatio
  const right = 20 * aspectRatio

  return (
    <>
      <CameraControls ref={cameraRef as any} />
      <OrthographicCamera
        makeDefault
        position={[20, 20, 20]}
        args={[left, right, 20, -20, 1, 1000]}
        rotation={[Math.atan(-1 / Math.sqrt(2)), -Math.PI / 4, 0]}
      />
    </>
  )
}`1`

const CANVAS_CAMERA_OPTIONS = {
  rotation: {
    order: 'YXZ',
    x: Math.atan(-1 / Math.sqrt(2)),
    y: -Math.PI / 4,
    z: 0,
  },
}

const CANVAS_CAMERA_OPTIONS = {
  rotation: new THREE.Euler(Math.atan(-1 / Math.sqrt(2)), -Math.PI / 4, 0),
};

const EditorCanvas = () => {
  return (
    <Canvas shadows dpr={[1, 2]} gl={{ antialias: false }} camera={CANVAS_CAMERA_OPTIONS}>
      <color attach="background" args={['#f0f0f0']} />
      <fog attach="fog" args={['red', 20, -5]} />
      <ambientLight intensity={1.5} />
      <pointLight position={[10, 10, 10]} intensity={1} castShadow />
      <Environment preset="city" />
      <Camera />
    </Canvas>
  );
};

const PinkMesh = (
  <mesh castShadow receiveShadow position={[1.75, 0.25, 1]} scale={0.75}>
    <sphereGeometry args={[1, 64, 64]} />
    <meshStandardMaterial color="hotpink" />
  </mesh>
)

const createFloorGridRow = (rowIndex: number) => {
  const boxes = range(N128).map((index) => {
    const box = 100
  })
}

const floorGridRows = range(N128).map((rowIndex) => {})

const FloorGrid = () => {}
