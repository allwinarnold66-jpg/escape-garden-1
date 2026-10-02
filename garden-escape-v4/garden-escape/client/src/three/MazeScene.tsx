import React from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { MazeData, Player } from '../types';

interface MazeSceneProps {
  maze: MazeData;
  players: Player[];
  currentPlayerId?: string;
}

export const MazeScene: React.FC<MazeSceneProps> = ({ maze, players }) => {
  const { size, nodes } = maze;

  return (
    <div style={{ width: '100%', height: '400px', borderRadius: '12px', overflow: 'hidden' }}>
      <Canvas camera={{ position: [size / 2, size * 1.5, size + 2], fov: 50 }}>
        <ambientLight intensity={0.7} />
        <directionalLight position={[10, 20, 15]} intensity={1.2} />
        <OrbitControls enableZoom={true} target={[size / 2, 0, size / 2]} />

        {/* Render Ground */}
        <mesh position={[size / 2 - 0.5, -0.1, size / 2 - 0.5]}>
          <boxGeometry args={[size * 2, 0.2, size * 2]} />
          <meshStandardMaterial color="#81c784" />
        </mesh>

        {/* Render Grid Base / Nodes */}
        {nodes.map((node) => (
          <mesh key={node.id} position={[node.col * 2, 0, node.row * 2]}>
            <boxGeometry args={[1.8, 0.1, 1.8]} />
            <meshStandardMaterial color="#c8e6c9" />
          </mesh>
        ))}

        {/* Render Players */}
        {players.map((p) => {
          const node = nodes[p.nodeId];
          if (!node) return null;
          return (
            <mesh key={p.id} position={[node.col * 2, 0.5, node.row * 2]}>
              <sphereGeometry args={[0.4, 16, 16]} />
              <meshStandardMaterial color={p.isAdmin ? '#e53935' : '#1e88e5'} />
            </mesh>
          );
        })}
      </Canvas>
    </div>
  );
};
