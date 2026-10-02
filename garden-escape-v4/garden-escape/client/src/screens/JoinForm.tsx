import React, { useState } from 'react';

interface JoinFormProps {
  role: 'admin' | 'player';
  onSubmit: (roomCode: string, name: string) => void;
  onBack: () => void;
}

export const JoinForm: React.FC<JoinFormProps> = ({ role, onSubmit, onBack }) => {
  const [roomCode, setRoomCode] = useState('');
  const [name, setName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (roomCode.trim() && name.trim()) {
      onSubmit(roomCode.trim().toUpperCase(), name.trim());
    }
  };

  return (
    <div className="card" style={{ maxWidth: '420px', margin: 'auto' }}>
      <h2>{role === 'admin' ? 'Create Game Room' : 'Join Game Room'}</h2>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <div>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>
            Your Name
          </label>
          <input
            className="input"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"
            required
          />
        </div>
        <div>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>
            Room Code
          </label>
          <input
            className="input"
            type="text"
            value={roomCode}
            onChange={(e) => setRoomCode(e.target.value)}
            placeholder="e.g. GARDEN1"
            required
          />
        </div>
        <button className="btn" type="submit">
          {role === 'admin' ? 'Create Room' : 'Join Room'}
        </button>
        <button
          type="button"
          className="btn"
          style={{ background: '#9e9e9e' }}
          onClick={onBack}
        >
          Back
        </button>
      </form>
    </div>
  );
};
