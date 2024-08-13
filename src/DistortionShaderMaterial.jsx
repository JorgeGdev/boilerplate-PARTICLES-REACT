import * as THREE from 'three';
import React, { useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';

const DistortionShaderMaterial = {
  uniforms: {
    uMouse: { value: new THREE.Vector2() },
    uDistortionStrength: { value: 1.0 },
  },
  vertexShader: `
  uniform vec2 uMouse;
  uniform float uDistortionStrength;

  varying float vDistortion; // Pasar la distorsión al fragment shader

  void main() {
    float dist = distance(gl_Position.xy, uMouse);
    vec3 distortedPosition = position + normalize(position) * uDistortionStrength / (dist + 0.1);

    vDistortion = dist; // Almacenar la distorsión

    gl_Position = projectionMatrix * modelViewMatrix * vec4(distortedPosition, 1.0);
  }
`,
fragmentShader: `
  varying float vDistortion;

  void main() {
    // Usar la distorsión para modificar el color
    gl_FragColor = vec4(1.0, 1.0 - vDistortion, 1.0 - vDistortion, 1.0);
  }
`,
};

const DistortedModel = () => {
  const { scene } = useGLTF('/models/satelite.glb');
  const meshRef = useRef();

  useEffect(() => {
    scene.traverse((child) => {
      if (child.isMesh) {
        child.material = new THREE.ShaderMaterial(DistortionShaderMaterial);
      }
    });
  }, [scene]);

  // Actualizar las coordenadas del mouse
  useFrame(({ mouse }) => {
    if (meshRef.current) {
      DistortionShaderMaterial.uniforms.uMouse.value.set(mouse.x * 2 - 1, mouse.y * 2 - 1);
    }
  });

  return <primitive ref={meshRef} object={scene} />;
};

export default DistortedModel;
