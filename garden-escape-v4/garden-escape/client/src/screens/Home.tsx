import React from 'react';

interface HomeProps {
  onSelectRole: (role: 'admin' | 'player') => void;
}

export const Home: React.FC<HomeProps> = ({ onSelectRole }) => {
  return (
    <div className="card" style={{ textAlign: 'center', maxWidth: '480px', margin: 'auto' }}>
      <h1 style={{ color: '#2e7d32', fontSize: '2.5rem' }}>Garden Escape</h1>
      <p style={{ color: '#555' }}>Learn, navigate, and escape the botanical labyrinth!</p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '1rem' }}>
        <button className="btn" onClick={() => onSelectRole('admin')}>
          Host Game (Admin)
        </button>
        <button
          className="btn"
          style={{ background: '#43a047' }}
          onClick={() => onSelectRole('player')}
        >
          Join Game (Player)
        </button>
      </div>
    </div>
  );
};
