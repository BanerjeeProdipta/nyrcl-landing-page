'use client';
import React, { useRef, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';
import { Vector3 } from 'three';
import * as THREE from 'three'; // Import THREE namespace

interface BallModelProps {
  scale: number;
  position: Vector3;
  rotation: number;
}

const BallModel: React.FC<BallModelProps> = ({ scale, position, rotation }) => {
  const { scene } = useGLTF('/cricket_ball_sports_white.glb');
  const ref = useRef<THREE.Group>(null);

  useFrame(() => {
    if (ref.current) {
      ref.current.rotation.y += 0.01;
    }
  });

  useEffect(() => {
    if (ref.current) {
      ref.current.rotation.y = rotation;
    }
  }, [rotation]);

  return (
    <primitive
      ref={ref}
      object={scene}
      scale={scale}
      position={position}
      castShadow
      receiveShadow
    />
  );
};

const GroundPlane: React.FC = () => {
  return (
    <mesh receiveShadow position={[0, -0.5, 0]}>
      <planeGeometry args={[100, 100]} />
      <shadowMaterial opacity={0.3} />
    </mesh>
  );
};

const BallScene: React.FC = () => {
  const [scrollY, setScrollY] = useState<number>(0);
  const [maxScrollY, setMaxScrollY] = useState<number>(0);
  const [viewportSize, setViewportSize] = useState<{
    width: number;
    height: number;
  }>({ width: window.innerWidth, height: window.innerHeight });

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    const handleResize = () =>
      setViewportSize({ width: window.innerWidth, height: window.innerHeight });

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);

    setMaxScrollY(document.documentElement.scrollHeight - window.innerHeight);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const progress = Math.min(scrollY / maxScrollY, 1);
  const rotation = scrollY * 0.005;

  // Scale calculation
  const initialScale = 0.5; // Initial larger scale
  const minScale = 0; // Minimum scale after scrolling
  const scale = initialScale - (initialScale - minScale) * progress;

  // Position calculation
  const viewportWidth = viewportSize.width;
  const viewportHeight = viewportSize.height - 620;
  const scaleFactor = 0.1; // Adjust this factor based on your scene and scale

  const startX = viewportWidth * scaleFactor;
  const startY = -viewportHeight * scaleFactor;

  const endX = 0;
  const endY = 0;

  // Curved path calculation
  const t = progress; // Parametric value for the curve
  const x = startX + (endX - startX) * (3 * t * t - 2 * t * t * t); // Ease in-out
  const y = startY + (endY - startY) * (3 * t * t - 2 * t * t * t); // Ease in-out
  const z = Math.sin(progress * Math.PI) * 20; // Increased arc height

  const position = new Vector3(x, y, z);

  return (
    <Canvas
      shadows
      camera={{ position: [-80, -80, 80], fov: 40 }}
      style={{ background: '#000' }}
    >
      <ambientLight intensity={0.5} />
      <directionalLight
        position={[10, 10, 10]}
        intensity={1.5}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-bias={-0.0001}
        shadow-radius={10}
      />
      <pointLight
        position={[5, 5, 5]}
        intensity={0.7}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-radius={10}
      />
      <GroundPlane />
      <BallModel scale={scale} position={position} rotation={rotation} />

      <OrbitControls
        enableZoom={false}
        enablePan={true}
        enableRotate={true}
        maxPolarAngle={Math.PI / 2}
      />
    </Canvas>
  );
};

export default BallScene;
