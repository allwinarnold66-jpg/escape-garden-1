import React from 'react';
import { RoomState } from '../types';
import { MazeScene } from '../three/MazeScene';

interface AdminGameProps {
  room: RoomState;
}

export const AdminGame: React.FC<AdminGameProps> = ({ room }) => {
  return (
    <div className="card">
      <h2>Admin Control - Live Game Overview</h2>
      <p>Room Code: <strong>{room.code}</strong></p>
      
      <MazeScene maze={room.maze} players={room.players} />

      <h3>Leaderboard</h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        {room.players.map((p) => (
          <div
            key={p.id}
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              padding: '0.8rem',
              background: p.hasEscaped ? '#d4edda' : '#f8f9fa',
              borderRadius: '6px'
            }}
          >
            <span>{p.name} {p.hasEscaped ? '🏆 Escaped!' : ''}</span>
            <span>Score: {p.score}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
