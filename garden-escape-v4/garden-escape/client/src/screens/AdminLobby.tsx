import React from 'react';
import { RoomState } from '../types';

interface AdminLobbyProps {
  room: RoomState;
  onStartStudy: () => void;
}

export const AdminLobby: React.FC<AdminLobbyProps> = ({ room, onStartStudy }) => {
  return (
    <div className="card" style={{ maxWidth: '600px', margin: 'auto' }}>
      <h2>Admin Lobby - Room: {room.code}</h2>
      <p>Share this room code with players to allow them to join.</p>
      
      <h3>Joined Players ({room.players.length})</h3>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {room.players.map((p) => (
          <li
            key={p.id}
            style={{
              padding: '0.5rem 1rem',
              background: '#f1f8e9',
              borderRadius: '6px',
              margin: '0.5rem 0',
              display: 'flex',
              justifyContent: 'space-between'
            }}
          >
            <span>{p.name} {p.isAdmin ? '(Admin)' : ''}</span>
          </li>
        ))}
      </ul>

      <button className="btn" onClick={onStartStudy}>
        Start Study Phase
      </button>
    </div>
  );
};
