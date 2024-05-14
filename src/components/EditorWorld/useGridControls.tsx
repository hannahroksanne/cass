import { useControls } from 'leva';
import { memo } from 'react';
import { Canvas } from '@react-three/fiber';
import {
  Grid,
  Center,
  GizmoHelper,
  GizmoViewport,
  AccumulativeShadows,
  RandomizedLight,
  OrbitControls,
  Environment,
  useGLTF,
} from '@react-three/drei';

export const useGridControls = () => {


  return {
    size: gridSize,
    config: gridConfig,
  };
  }
};

export const Shadows = memo(() => (
  <AccumulativeShadows
    temporal
    frames={100}
    color="#9d4b4b"
    colorBlend={0.5}
    alphaTest={0.9}
    scale={20}
  >
    <RandomizedLight amount={8} radius={4} position={[5, 5, -10]} />
  </AccumulativeShadows>
));
