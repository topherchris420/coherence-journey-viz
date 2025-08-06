import React, { useState, useRef, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Sphere, Line, Text } from '@react-three/drei';
import * as THREE from 'three';
import { Slider } from '@/components/ui/slider';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface CoherenceState {
  coreTone: number;
  karmaLoad: number;
  coherenceLevel: number;
  mirrorInteractions: number;
  emotionalInput: string;
  zone: 'heaven' | 'hell' | 'reincarnation' | 'neutral';
}

// Core Soul Waveform Component
const CoreWaveform: React.FC<{ state: CoherenceState }> = ({ state }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);

  const vertexShader = `
    uniform float time;
    uniform float coreTone;
    uniform float coherence;
    varying vec3 vPosition;
    varying float vElevation;
    
    void main() {
      vPosition = position;
      
      // Create dynamic waveform based on core tone
      float elevation = sin(position.x * coreTone + time * 2.0) * 
                       cos(position.z * coreTone * 0.5 + time * 1.5) * 
                       coherence * 0.3;
      
      vec3 newPosition = position + normal * elevation;
      vElevation = elevation;
      
      gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
    }
  `;

  const fragmentShader = `
    uniform float time;
    uniform float coreTone;
    uniform float karmaLoad;
    uniform float coherence;
    uniform vec3 zoneColor;
    varying vec3 vPosition;
    varying float vElevation;
    
    void main() {
      // Dynamic color based on state
      vec3 color1 = vec3(0.8, 0.2, 1.0); // Primary purple
      vec3 color2 = vec3(0.2, 0.8, 1.0); // Accent cyan
      vec3 color3 = zoneColor;
      
      float mixFactor = sin(time * 2.0 + vPosition.x * coreTone) * 0.5 + 0.5;
      vec3 mixedColor = mix(mix(color1, color2, mixFactor), color3, karmaLoad * 0.3);
      
      // Add ethereal glow
      float intensity = 1.0 + abs(vElevation) * 2.0;
      mixedColor *= intensity;
      
      // Coherence affects opacity and brightness
      float alpha = 0.7 + coherence * 0.3;
      
      gl_FragColor = vec4(mixedColor, alpha);
    }
  `;

  useFrame((frameState) => {
    if (materialRef.current) {
      materialRef.current.uniforms.time.value = frameState.clock.elapsedTime;
      materialRef.current.uniforms.coreTone.value = state.coreTone;
      materialRef.current.uniforms.karmaLoad.value = state.karmaLoad;
      materialRef.current.uniforms.coherence.value = state.coherenceLevel;
      
      // Zone color mapping
      const zoneColors = {
        heaven: new THREE.Vector3(1.0, 0.98, 0.4),
        hell: new THREE.Vector3(1.0, 0.2, 0.2),
        reincarnation: new THREE.Vector3(0.8, 0.4, 1.0),
        neutral: new THREE.Vector3(0.5, 0.5, 0.8)
      };
      materialRef.current.uniforms.zoneColor.value = zoneColors[state.zone];
    }
    
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.005;
    }
  });

  return (
    <mesh ref={meshRef} position={[0, 0, 0]}>
      <sphereGeometry args={[2, 64, 64]} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={{
          time: { value: 0 },
          coreTone: { value: state.coreTone },
          karmaLoad: { value: state.karmaLoad },
          coherence: { value: state.coherenceLevel },
          zoneColor: { value: new THREE.Vector3(0.5, 0.5, 0.8) }
        }}
        transparent
        side={THREE.DoubleSide}
      />
    </mesh>
  );
};

// Fractal Experience Nodes
const ExperienceNodes: React.FC<{ state: CoherenceState }> = ({ state }) => {
  const groupRef = useRef<THREE.Group>(null);
  
  useFrame((frameState) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.002;
    }
  });

  const nodes = Array.from({ length: 8 }, (_, i) => {
    const angle = (i / 8) * Math.PI * 2;
    const radius = 4 + Math.sin(i * 0.5) * 1;
    const x = Math.cos(angle) * radius;
    const z = Math.sin(angle) * radius;
    const y = Math.sin(i * 1.2) * 2;
    
    const intensity = (state.coherenceLevel + Math.sin(i * 0.8) * 0.3) * 0.5;
    const color = new THREE.Color().setHSL(
      (state.coreTone * 0.1 + i * 0.125) % 1,
      0.8,
      0.4 + intensity * 0.4
    );

    return (
      <group key={i} position={[x, y, z]}>
        <Sphere args={[0.2, 16, 16]}>
          <meshStandardMaterial 
            color={color}
            emissive={color}
            emissiveIntensity={intensity}
            transparent
            opacity={0.8}
          />
        </Sphere>
        
        {/* Connecting lines to core */}
        <Line
          points={[[0, 0, 0], [-x, -y, -z]]}
          color={color}
          opacity={0.3}
          transparent
        />
      </group>
    );
  });

  return <group ref={groupRef}>{nodes}</group>;
};

// Spectral Field Particles
const SpectralField: React.FC<{ state: CoherenceState }> = ({ state }) => {
  const particlesRef = useRef<THREE.Points>(null);
  const materialRef = useRef<THREE.PointsMaterial>(null);

  useFrame((frameState) => {
    if (particlesRef.current && materialRef.current) {
      const positions = particlesRef.current.geometry.attributes.position.array as Float32Array;
      const time = frameState.clock.elapsedTime;
      
      for (let i = 0; i < positions.length; i += 3) {
        const x = positions[i];
        const z = positions[i + 2];
        positions[i + 1] += Math.sin(time * 2 + x * 0.1) * 0.01 * state.mirrorInteractions;
      }
      
      particlesRef.current.geometry.attributes.position.needsUpdate = true;
      materialRef.current.size = 0.1 + state.coherenceLevel * 0.1;
    }
  });

  const particleCount = 2000;
  const positions = new Float32Array(particleCount * 3);
  
  for (let i = 0; i < particleCount; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 20;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 20;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 20;
  }

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        ref={materialRef}
        color={new THREE.Color().setHSL(state.coreTone * 0.1, 0.7, 0.6)}
        size={0.1}
        transparent
        opacity={0.6}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
};

// Zone Corridors
const ZoneCorridors: React.FC<{ state: CoherenceState }> = ({ state }) => {
  return (
    <>
      {/* Heaven Zone */}
      <group position={[0, 8, 0]}>
        <Text
          fontSize={0.5}
          color="#FFE55C"
          anchorX="center"
          anchorY="middle"
        >
          HEAVEN FREQUENCIES
        </Text>
        <mesh>
          <sphereGeometry args={[6, 32, 16, 0, Math.PI]} />
          <meshBasicMaterial color="#FFE55C" opacity={0.1} transparent wireframe />
        </mesh>
      </group>

      {/* Hell Zone */}
      <group position={[0, -8, 0]}>
        <Text
          fontSize={0.5}
          color="#FF3333"
          anchorX="center"
          anchorY="middle"
        >
          SHADOW FREQUENCIES
        </Text>
        <mesh>
          <sphereGeometry args={[6, 32, 16, Math.PI, Math.PI]} />
          <meshBasicMaterial color="#FF3333" opacity={0.1} transparent wireframe />
        </mesh>
      </group>

      {/* Reincarnation Band */}
      <group position={[0, 0, 0]}>
        <Text
          fontSize={0.4}
          color="#CC66FF"
          anchorX="center"
          anchorY="middle"
          position={[8, 0, 0]}
        >
          REINCARNATION BAND
        </Text>
        {Array.from({ length: 16 }, (_, i) => {
          const angle = (i / 16) * Math.PI * 2;
          return (
            <Line
              key={i}
              points={[
                [Math.cos(angle) * 7, -1, Math.sin(angle) * 7],
                [Math.cos(angle) * 7, 1, Math.sin(angle) * 7]
              ]}
              color="#CC66FF"
              opacity={0.3}
              transparent
            />
          );
        })}
      </group>
    </>
  );
};

// Main 3D Scene
const CoherenceScene: React.FC<{ state: CoherenceState }> = ({ state }) => {
  return (
    <>
      <ambientLight intensity={0.2} />
      <pointLight position={[10, 10, 10]} intensity={1} color="#9D4EDD" />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#06FFA5" />
      
      <CoreWaveform state={state} />
      <ExperienceNodes state={state} />
      <SpectralField state={state} />
      <ZoneCorridors state={state} />
      
      <OrbitControls 
        enablePan={false}
        enableZoom={true}
        enableRotate={true}
        autoRotate
        autoRotateSpeed={0.5}
        minDistance={5}
        maxDistance={25}
      />
    </>
  );
};

// Main Coherence Engine Component
export const CoherenceEngine: React.FC = () => {
  const [state, setState] = useState<CoherenceState>({
    coreTone: 5,
    karmaLoad: 0.5,
    coherenceLevel: 0.7,
    mirrorInteractions: 0.3,
    emotionalInput: 'neutral',
    zone: 'neutral'
  });

  const [isPostDeath, setIsPostDeath] = useState(false);

  const updateState = (updates: Partial<CoherenceState>) => {
    setState(prev => ({ ...prev, ...updates }));
  };

  return (
    <div className="min-h-screen bg-gradient-oversoul relative overflow-hidden">
      {/* Background Cosmic Effects */}
      <div className="absolute inset-0 bg-gradient-cosmic animate-cosmic-spin opacity-30" />
      
      {/* Header */}
      <header className="relative z-10 p-6 text-center">
        <h1 className="text-4xl font-bold bg-gradient-soul bg-clip-text text-transparent animate-soul-pulse">
          Coherence Engine
        </h1>
        <p className="text-foreground/80 mt-2">
          Interactive Soul Resonance Visualization
        </p>
      </header>

      {/* Main Container */}
      <div className="flex h-[calc(100vh-120px)] gap-6 px-6 pb-6">
        
        {/* Controls Panel */}
        <Card className="w-80 p-6 bg-card/90 backdrop-blur-sm border-primary/20 shadow-resonance">
          <h2 className="text-xl font-semibold mb-6 text-primary">Resonance Controls</h2>
          
          <div className="space-y-6">
            {/* Core Tone */}
            <div>
              <label className="text-sm font-medium mb-2 block">
                Core Tone Frequency: {state.coreTone.toFixed(1)}
              </label>
              <Slider
                value={[state.coreTone]}
                onValueChange={([value]) => updateState({ coreTone: value })}
                min={1}
                max={10}
                step={0.1}
                className="w-full"
              />
            </div>

            {/* Karma Load */}
            <div>
              <label className="text-sm font-medium mb-2 block">
                Karma Load: {(state.karmaLoad * 100).toFixed(0)}%
              </label>
              <Slider
                value={[state.karmaLoad]}
                onValueChange={([value]) => updateState({ karmaLoad: value })}
                min={0}
                max={1}
                step={0.01}
                className="w-full"
              />
            </div>

            {/* Coherence Level */}
            <div>
              <label className="text-sm font-medium mb-2 block">
                Coherence Level: {(state.coherenceLevel * 100).toFixed(0)}%
              </label>
              <Slider
                value={[state.coherenceLevel]}
                onValueChange={([value]) => updateState({ coherenceLevel: value })}
                min={0}
                max={1}
                step={0.01}
                className="w-full"
              />
            </div>

            {/* Mirror Interactions */}
            <div>
              <label className="text-sm font-medium mb-2 block">
                Mirror Interactions: {(state.mirrorInteractions * 100).toFixed(0)}%
              </label>
              <Slider
                value={[state.mirrorInteractions]}
                onValueChange={([value]) => updateState({ mirrorInteractions: value })}
                min={0}
                max={1}
                step={0.01}
                className="w-full"
              />
            </div>

            {/* Zone Selection */}
            <div>
              <label className="text-sm font-medium mb-2 block">Current Zone</label>
              <div className="grid grid-cols-2 gap-2">
                {(['heaven', 'hell', 'reincarnation', 'neutral'] as const).map((zone) => (
                  <Button
                    key={zone}
                    variant={state.zone === zone ? "default" : "outline"}
                    size="sm"
                    onClick={() => updateState({ zone })}
                    className="text-xs"
                  >
                    {zone.toUpperCase()}
                  </Button>
                ))}
              </div>
            </div>

            {/* Post-Death Realignment */}
            <div className="pt-4 border-t border-border">
              <Button
                variant={isPostDeath ? "destructive" : "secondary"}
                onClick={() => setIsPostDeath(!isPostDeath)}
                className="w-full"
              >
                {isPostDeath ? "Return to Life" : "Simulate Post-Death"}
              </Button>
            </div>
          </div>
        </Card>

        {/* 3D Visualization */}
        <div className="flex-1 rounded-lg overflow-hidden border border-primary/20 shadow-ethereal">
          <Canvas
            camera={{ position: [0, 0, 15], fov: 60 }}
            className="bg-gradient-oversoul"
          >
            <CoherenceScene state={state} />
          </Canvas>
        </div>
      </div>

      {/* Status Bar */}
      <div className="absolute bottom-0 left-0 right-0 bg-card/80 backdrop-blur-sm border-t border-primary/20 p-4">
        <div className="flex justify-between text-sm">
          <span>Zone: <span className="text-primary font-medium">{state.zone.toUpperCase()}</span></span>
          <span>Coherence: <span className="text-accent font-medium">{(state.coherenceLevel * 100).toFixed(0)}%</span></span>
          <span>Karma Load: <span className="text-destructive font-medium">{(state.karmaLoad * 100).toFixed(0)}%</span></span>
          <span>Status: <span className="text-reincarnation font-medium">{isPostDeath ? "POST-DEATH" : "INCARNATE"}</span></span>
        </div>
      </div>
    </div>
  );
};