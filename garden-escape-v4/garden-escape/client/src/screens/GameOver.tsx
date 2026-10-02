import React from 'react';
import { RoomState } from '../types';

interface GameOverProps {
  room: RoomState;
}

export const GameOver: React.FC<GameOverProps> = ({ room }) => {
  return (
    <div className="card" style={{ maxWidth: '500px', margin: 'auto', textAlign: 'center' }}>
      <h1>Game Over!</h1>
      {room.winner ? (
        <h2>🏆 Winner: {room.winner.name}!</h2>
      ) : (
        <h2>Time's up! No one escaped.</h2>
      )}

      <h3>Final Scoreboard</h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', margin: '1rem 0' }}>
        {room.players
          .slice()
          .sort((a, b) => b.score - a.score)
          .map((p, idx) => (
            <div
              key={p.id}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                padding: '0.8rem',
                background: idx === 0 ? '#fff3cd' : '#f8f9fa',
                borderRadius: '6px'
              }}
            >
              <span>{idx + 1}. {p.name}</span>
              <span>{p.score} pts</span>
            </div>
          ))}
      </div>
    </div>
  );
};
