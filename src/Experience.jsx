import React, { useRef, useEffect } from 'react';
import { OrbitControls } from '@react-three/drei';
import { Tween, Group, Easing } from '@tweenjs/tween.js';
import * as THREE from 'three';
import Particles from './Particles';

const Experience = () => {
  const controlsRef = useRef();
  const tweenGroup = useRef(new Group());

  useEffect(() => {
    const camera = controlsRef.current.object;
    const controls = controlsRef.current;

    

    // Posición inicial de la cámara lejos del modelo
    camera.position.set(-25, 8, -10);

    // Primera animación: acercar la cámara y rodear el modelo de izquierda a derecha
    const tween1 = new Tween(camera.position, tweenGroup.current)
      .to({ x: -20, y: 8, z: -10 }, 3000) // Ajusta estos valores para un movimiento más natural
      .easing(Easing.Quadratic.InOut);

    const tween2 = new Tween(camera.position, tweenGroup.current)
      .to({ x: -18, y: 5, z: -10 }, 3000) // Rodea el modelo de izquierda a derecha
      .easing(Easing.Quadratic.InOut);

    // Segunda animación: colocar la cámara en el centro, a -5 en el eje Z
    const tween3 = new Tween(camera.position, tweenGroup.current)
      .to({ x: -16, y: 6, z: -8 }, 3000) // Posición final de la cámara
      .easing(Easing.Quadratic.InOut)
      .onComplete(() => {
        controls.enabled = true; // Rehabilitar los controles después de la animación
        setOrbitControlsLimits(controls); // Configurar los límites de los controles
      });

    // Encadenar las animaciones
    tween1.chain(tween2);
    tween2.chain(tween3);

    tween1.start();

    return () => {
      tweenGroup.current.remove(tween1);
      tweenGroup.current.remove(tween2);
      tweenGroup.current.remove(tween3);
    };
  }, []);

  useEffect(() => {
    const animate = (time) => {
      tweenGroup.current.update(time);
      requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, []);

  const setOrbitControlsLimits = (controls) => {
    controls.enableDamping = true;
    controls.dampingFactor = 0.09;
    controls.minDistance = 15;
    controls.maxDistance = 20;
    controls.enableRotate = true;
    controls.enableZoom = true;
    controls.maxPolarAngle = 6;
  };

  return (
    <>
      <ambientLight intensity={0.82} color={0xa0a0fc} />
      <directionalLight intensity={1.96} color={0xe8c37b} position={[-69, 44, 14]} />
      <OrbitControls ref={controlsRef} />
      <Particles />
    </>
  );
};

export default Experience;
