import React, { useState, useRef, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Sphere, Line, Text } from '@react-three/drei';
import * as THREE from 'three';
import { Slider } from '@/components/ui/slider';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useIsMobile } from '@/hooks/use-mobile';
import { Sidebar, SidebarProvider } from '@/components/ui/sidebar';

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
          count={particleCount}
          array={positions}
          itemSize={3}
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
  const isMobile = useIsMobile();

  const updateState = (updates: Partial<CoherenceState>) => {
    setState(prev => ({ ...prev, ...updates }));
  };

  const Controls = () => (
    <Card className="w-full md:w-80 p-6 bg-card/90 backdrop-blur-sm border-primary/20 shadow-resonance space-y-8">
      <div className="space-y-2">
        <h2 className="text-heading text-cosmic text-primary animate-glow-pulse">
          RESONANCE CONTROLS
        </h2>
        <div className="h-px bg-gradient-harmonic opacity-60" />
      </div>

      <div className="space-y-8">
        {/* Core Tone */}
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <label className="text-label text-primary-glow">
              CORE TONE FREQUENCY
            </label>
            <span className="text-body font-mono text-accent animate-glow-pulse">
              {state.coreTone.toFixed(1)} Hz
            </span>
          </div>
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
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <label className="text-label text-hell-glow">
              KARMA LOAD
            </label>
            <span className="text-body font-mono text-destructive animate-glow-pulse">
              {(state.karmaLoad * 100).toFixed(0)}%
            </span>
          </div>
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
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <label className="text-label text-heaven-glow">
              COHERENCE LEVEL
            </label>
            <span className="text-body font-mono text-coherence-high animate-glow-pulse">
              {(state.coherenceLevel * 100).toFixed(0)}%
            </span>
          </div>
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
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <label className="text-label text-reincarnation-glow">
              MIRROR INTERACTIONS
            </label>
            <span className="text-body font-mono text-reincarnation animate-glow-pulse">
              {(state.mirrorInteractions * 100).toFixed(0)}%
            </span>
          </div>
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
        <div className="space-y-4">
          <label className="text-label text-accent">FREQUENCY ZONE</label>
          <div className="grid grid-cols-2 gap-3">
            {(['heaven', 'hell', 'reincarnation', 'neutral'] as const).map((zone) => (
              <Button
                key={zone}
                variant={state.zone === zone ? "default" : "outline"}
                size="sm"
                onClick={() => updateState({ zone })}
                className="text-label font-cosmic transition-soul hover:animate-glow-pulse"
              >
                {zone.toUpperCase()}
              </Button>
            ))}
          </div>
        </div>

        {/* Post-Death Realignment */}
        <div className="pt-6 border-t border-primary/20 space-y-3">
          <label className="text-label text-destructive">SOUL TRANSITION</label>
          <Button
            variant={isPostDeath ? "destructive" : "secondary"}
            onClick={() => setIsPostDeath(!isPostDeath)}
            className="w-full text-label font-cosmic transition-soul animate-float-gentle"
          >
            {isPostDeath ? "◄ RETURN TO INCARNATION" : "► SIMULATE POST-DEATH"}
          </Button>
        </div>
      </div>
    </Card>
  );

  return (
    <SidebarProvider>
      <div className="min-h-screen bg-gradient-oversoul relative overflow-hidden">
        {/* Background Cosmic Effects */}
        <div className="absolute inset-0 bg-gradient-cosmic animate-cosmic-spin opacity-30" />

        {/* Header */}
        <header className="relative z-10 p-8 text-center space-y-4">
          <div className="space-y-2">
            <h1 className="text-display text-cosmic text-shimmer bg-gradient-soul bg-clip-text text-transparent animate-text-shimmer">
              COHERENCE ENGINE
            </h1>
            <div className="h-px w-32 mx-auto bg-gradient-harmonic animate-glow-pulse" />
          </div>
          <p className="text-subheading text-foreground/70 animate-float-gentle">
            Interactive Soul Resonance Visualization
          </p>
          <div className="flex justify-center gap-4 text-label text-primary/60">
            <span className="animate-float-gentle" style={{ animationDelay: '0.5s' }}>
              QUANTUM FREQUENCY
            </span>
            <span className="text-accent">•</span>
            <span className="animate-float-gentle" style={{ animationDelay: '1s' }}>
              ETHEREAL DYNAMICS
            </span>
            <span className="text-accent">•</span>
            <span className="animate-float-gentle" style={{ animationDelay: '1.5s' }}>
              SOUL RESONANCE
            </span>
          </div>
        </header>

        {/* Main Container */}
        <main className="flex flex-col md:flex-row h-auto md:h-[calc(100vh-220px)] gap-6 px-6 pb-6">
          {/* Controls Panel */}
          {isMobile ? (
            <Sidebar>
              <Controls />
            </Sidebar>
          ) : (
            <Controls />
          )}

          {/* 3D Visualization */}
          <div className="h-[50vh] md:h-full md:flex-1 rounded-lg overflow-hidden border border-primary/20 shadow-ethereal">
            <Canvas
              camera={{ position: [0, 0, 15], fov: 60 }}
              className="bg-gradient-oversoul"
            >
              <CoherenceScene state={state} />
            </Canvas>
          </div>
        </main>

        {/* Status Bar */}
        <div className="absolute bottom-0 left-0 right-0 bg-card/90 backdrop-blur-sm border-t border-primary/20 p-6">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <span className="text-label text-muted-foreground">ZONE:</span>
              <span className="text-body font-cosmic text-primary animate-glow-pulse">{state.zone.toUpperCase()}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-label text-muted-foreground">COHERENCE:</span>
              <span className="text-body font-mono text-accent animate-glow-pulse">{(state.coherenceLevel * 100).toFixed(0)}%</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-label text-muted-foreground">KARMA:</span>
              <span className="text-body font-mono text-destructive animate-glow-pulse">{(state.karmaLoad * 100).toFixed(0)}%</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-label text-muted-foreground">STATUS:</span>
              <span className="text-body font-cosmic text-reincarnation animate-glow-pulse">
                {isPostDeath ? "◆ POST-DEATH" : "◆ INCARNATE"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
};