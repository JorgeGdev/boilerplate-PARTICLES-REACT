import './style.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Canvas } from '@react-three/fiber';
import Experience from './Experience';

const root = ReactDOM.createRoot(document.querySelector('#root'));

root.render(
  <Canvas
    camera={{
      fov: 35,
      near: 1,
      far: 100,
      position: [-17, 7, -10]
    }}
    style={{ background: '#000000' }} 
  >
    <Experience />
  </Canvas>
);
