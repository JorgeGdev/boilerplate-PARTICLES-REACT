import React, { useEffect, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { BufferGeometry, BufferAttribute, Vector3 } from 'three';
import { MeshSurfaceSampler } from 'three/examples/jsm/math/MeshSurfaceSampler';
import { useGLTF } from '@react-three/drei';

const Particles = () => {
  const { scene } = useGLTF('/models/satelite.glb');
  const particlesRef = useRef();
  const count = 10000; // Número de partículas

  useEffect(() => {
    if (!scene) return;

    // Encuentra el primer mesh en la escena que tenga geometría
    let mesh;
    scene.traverse((child) => {
      if (child.isMesh) {
        mesh = child;
      }
    });

    if (!mesh) {
      console.error('No se encontró ningún Mesh con geometría en la escena');
      return;
    }

    const sampler = new MeshSurfaceSampler(mesh)
      .setWeightAttribute(null)
      .build();

    const positions = new Float32Array(count * 3);
    const tempPosition = new Vector3();

    for (let i = 0; i < count; i++) {
      sampler.sample(tempPosition);
      positions.set([tempPosition.x, tempPosition.y, tempPosition.z], i * 3);
    }

    const geometry = new BufferGeometry();
    geometry.setAttribute('position', new BufferAttribute(positions, 3));

    if (particlesRef.current) {
      particlesRef.current.geometry = geometry;
    }
  }, [scene]);

  // Añadir rotación continua en el eje Y
  useFrame(() => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y += 0.003; // Ajusta la velocidad de rotación
    }
  });

  return (
    <points ref={particlesRef}>
      <bufferGeometry />
      <pointsMaterial size={0.05} color="white" />
    </points>
  );
};

export default Particles;
