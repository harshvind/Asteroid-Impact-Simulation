import { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Sphere, useTexture } from '@react-three/drei';
import * as THREE from 'three';

interface ImpactMarker {
  lat: number;
  lng: number;
  radius: number;
}

// Convert lat/lng to 3D coordinates on a sphere
function latLngToVector3(lat: number, lng: number, radius: number): THREE.Vector3 {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lng + 180) * (Math.PI / 180);
  
  const x = -(radius * Math.sin(phi) * Math.cos(theta));
  const z = radius * Math.sin(phi) * Math.sin(theta);
  const y = radius * Math.cos(phi);
  
  return new THREE.Vector3(x, y, z);
}

function Earth({ impactMarker }: { impactMarker: ImpactMarker | null }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  // Load Earth texture
  const earthTexture = useTexture('https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/textures/planets/earth_atmos_2048.jpg');

  useFrame(() => {
    if (meshRef.current && !hovered) {
      meshRef.current.rotation.y += 0.001;
    }
  });

  // Calculate impact position if marker exists
  const impactPosition = impactMarker 
    ? latLngToVector3(impactMarker.lat, impactMarker.lng, 2.05)
    : null;

  return (
    <group>
      <Sphere
        ref={meshRef}
        args={[2, 64, 64]}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <meshStandardMaterial
          map={earthTexture}
          roughness={0.7}
          metalness={0.1}
        />
      </Sphere>

      {/* Impact marker */}
      {impactMarker && impactPosition && (
        <group>
          {/* Crater */}
          <Sphere args={[0.1, 32, 32]} position={impactPosition}>
            <meshStandardMaterial color="#ff6b35" emissive="#ff4500" emissiveIntensity={0.5} />
          </Sphere>
          
          {/* Shockwave rings */}
          {[0.3, 0.5, 0.7].map((radius, i) => {
            const ringPosition = impactPosition.clone().normalize().multiplyScalar(2.02);
            const normal = impactPosition.clone().normalize();
            const quaternion = new THREE.Quaternion().setFromUnitVectors(
              new THREE.Vector3(0, 0, 1),
              normal
            );
            
            return (
              <mesh 
                key={i} 
                position={ringPosition}
                quaternion={quaternion}
              >
                <ringGeometry args={[radius, radius + 0.02, 32]} />
                <meshBasicMaterial
                  color="#ff6b35"
                  transparent
                  opacity={0.3 - i * 0.1}
                  side={THREE.DoubleSide}
                />
              </mesh>
            );
          })}
        </group>
      )}
    </group>
  );
}

interface EarthVisualizationProps {
  impactData: {
    latitude: number;
    longitude: number;
    craterRadius: number;
  } | null;
}

export const EarthVisualization = ({ impactData }: EarthVisualizationProps) => {
  const impactMarker: ImpactMarker | null = impactData
    ? {
        lat: impactData.latitude,
        lng: impactData.longitude,
        radius: impactData.craterRadius,
      }
    : null;

  return (
    <div className="w-full h-full relative">
      <Canvas camera={{ position: [0, 0, 6], fov: 45 }}>
        <ambientLight intensity={0.3} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <pointLight position={[-10, -10, -10]} intensity={0.3} color="#4a90e2" />
        <Earth impactMarker={impactMarker} />
        <OrbitControls
          enableZoom={true}
          enablePan={false}
          minDistance={4}
          maxDistance={10}
          autoRotate={false}
        />
        <gridHelper args={[10, 10, '#1a3d6b', '#0d1f3a']} />
      </Canvas>
      
      {/* Overlay controls */}
      <div className="absolute top-4 right-4 glassmorphic p-3 rounded-lg">
        <p className="text-xs text-muted-foreground">Click and drag to rotate</p>
        <p className="text-xs text-muted-foreground">Scroll to zoom</p>
      </div>
    </div>
  );
};
