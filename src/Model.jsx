// Model.jsx
import React from 'react';
import { useGLTF } from '@react-three/drei';

const Model = () => {
  const { scene } = useGLTF('/models/satelite.glb');
  return <primitive object={scene} />;
};

export default Model;
