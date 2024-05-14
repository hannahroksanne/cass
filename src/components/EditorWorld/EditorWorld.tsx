import * as React from 'react';
import * as THREE from 'three';
import { useControls } from 'leva';
import {
  PerspectiveCamera,
  Grid,
  OrbitControls,
  Outlines,
} from '@react-three/drei';

import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { InstancedMesh, SphereGeometry, MeshBasicMaterial, Color } from 'three';
import { useRef, useState } from 'react';

const Voxel = () => {
  const { viewport } = useThree();
  const count = 32;
  const step = 2;
  const separation = 3;

  const instances = [];
  const [hoveredInstance, setHoveredInstance] = useState(null);

  for (let x = 0; x < count; x += step) {
    for (let y = 0; y < count; y += step) {
      for (let z = 0; z < count; z += step) {
        instances.push({
          position: [x * separation, y * separation, z * separation],
          color: new Color('red'),
        });
      }
    }
  }

  const meshRef = useRef();

  useFrame(() => {
    meshRef.current.material.color.set('red');
    if (hoveredInstance !== null) {
      meshRef.current.instanceMatrix.needsUpdate = true;
      meshRef.current.setColorAt(hoveredInstance, new Color('blue'));
    }
  });

  return (
    <instancedMesh ref={meshRef} args={[null, null, instances.length]}>
      <sphereGeometry args={[0.5, 32, 32]} />
      <meshBasicMaterial attach="material" vertexColors={true} />
      {instances.map((instance, index) => (
        <instancedBufferAttribute
          key={index}
          attach="attributes-position"
          args={[new Float32Array(instance.position), 3]}
        />
      ))}
      <instancedBufferAttribute
        ref={meshRef.current}
        attachObject={['attributes', 'color']}
        args={[instances.map((instance) => instance.color.toArray()).flat(), 3]}
      />
      <meshPhongMaterial attach="material" />
    </instancedMesh>
  );
};

const getXyzArray = (size: number) => {
  const dimension = Array(size)
    .fill(0)
    .map((_, i) => i);
  return [dimension, dimension, dimension];
};

const xyzArray = getXyzArray(64);

export const EditorWorld = () => {
  return (
    <div className="h-screen w-screen">
      <Canvas>
        <PerspectiveCamera />

        <ambientLight intensity={Math.PI} />
        <spotLight
          angle={1.5}
          intensity={300}
          castShadow
          position={[5, 15, 5]}
        />
        <spotLight
          angle={1.5}
          intensity={300}
          castShadow
          position={[5, 10, -5]}
        />
        <FloorGrid />
        <OrbitControls />
        <Voxel />
      </Canvas>
    </div>
  );
};

// const boxGeometry = new THREE.BoxGeometry();
// const materials = new THREE.MeshStandardMaterial({ color: '#ff0000' });

// const CubeGrid = () => {
//   const size = 32;
//   const margin = 0.05; // Adjust the margin as needed
//   const instances = size * size * size;
//   const meshRef = React.useRef();
//   const [hovered, setHovered] = React.useState(null);

//   const positions = React.useMemo(() => {
//     const pos = [];
//     for (let i = 0; i < size; i++) {
//       for (let j = 0; j < size; j++) {
//         for (let k = 0; k < size; k++) {
//           const x = i * (1 + margin); // Apply margin in x direction
//           const y = j * (1 + margin); // Apply margin in y direction
//           const z = k * (1 + margin); // Apply margin in z direction

//           pos.push([x, y, z]);
//         }
//       }
//     }

//     return pos;
//   }, [size, margin]);

//   useFrame(() => {
//     positions.forEach((position, i) => {
//       const [x, y, z] = position;
//       const matrix = new THREE.Matrix4().makeTranslation(x, y, z);
//       meshRef.current.setMatrixAt(i, matrix);
//     });

//     meshRef.current.instanceMatrix.needsUpdate = true;
//   });

//   return (
//     <Outlines color="#000000" thickness={0.2}>
//       <instancedMesh ref={meshRef} args={[boxGeometry, materials, instances]}>
//         {positions.map((_, index) => (
//           <mesh
//             key={index}
//             onPointerOver={() => setHovered(index)}
//             onPointerOut={() => setHovered(null)}
//           >
//             <boxGeometry args={[1, 1, 1]} />
//             <meshStandardMaterial
//               color={hovered === index ? '#00ff00' : '#ff0000'}
//             />
//           </mesh>
//         ))}
//       </instancedMesh>
//     </Outlines>
//   );
// };

const FloorGrid = () => {
  const { gridSize, ...gridConfig } = useControls({
    gridSize: [64 * 0.25, 64 * 0.25],
    cellSize: { value: 0.25, min: 0, max: 2, step: 0.05 },
    cellThickness: { value: 1, min: 0, max: 5, step: 0.1 },
    cellColor: '#6f6f6f',
    sectionColor: '#9d4b4b',
    sectionSize: { value: 3.3, min: 0, max: 10, step: 0.1 },
    sectionThickness: { value: 1.5, min: 0, max: 5, step: 0.1 },
    fadeDistance: { value: 25, min: 0, max: 100, step: 1 },
    fadeStrength: { value: 1, min: 0, max: 1, step: 0.1 },
    followCamera: false,
    infiniteGrid: false,
  });

  return <Grid position={[5, 0, 0]} args={gridSize} {...gridConfig} />;
};
