import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Sphere, useTexture } from '@react-three/drei';
import * as THREE from 'three';

function Earth() {
  const earthRef = useRef<THREE.Mesh>(null);

  // Load realistic Earth texture
  const earthTexture = useTexture('https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/textures/planets/earth_atmos_2048.jpg');

  // Auto-rotation
  useFrame(() => {
    if (earthRef.current) {
      earthRef.current.rotation.y += 0.002;
    }
  });

  return (
    <group>
      {/* Main Earth sphere with realistic texture */}
      <Sphere ref={earthRef} args={[2, 64, 64]}>
        <meshStandardMaterial
          map={earthTexture}
          roughness={0.7}
          metalness={0.1}
        />
      </Sphere>
    </group>
  );
}

export const EarthModel3D = () => {
  return (
    <div className="w-full h-full">
      <Canvas 
        camera={{ position: [0, 0, 6], fov: 50 }}
      >
        
        {/* Lighting */}
        <ambientLight intensity={0.3} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <pointLight position={[-10, -10, -10]} intensity={0.3} color="#4a90e2" />

        {/* Earth */}
        <Earth />

        {/* Controls */}
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate
          autoRotateSpeed={0.5}
          minPolarAngle={Math.PI / 3}
          maxPolarAngle={2 * Math.PI / 3}
        />
      </Canvas>
    </div>
  );
};
