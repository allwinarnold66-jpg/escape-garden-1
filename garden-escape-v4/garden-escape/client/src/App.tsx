import React, { useState } from 'react';
import './App.css';
import { useGameState } from './hooks/useGameState';
import { Home } from './screens/Home';
import { JoinForm } from './screens/JoinForm';
import { AdminLobby } from './screens/AdminLobby';
import { MazeStudy } from './screens/MazeStudy';
import { AdminGame } from './screens/AdminGame';
import { PlayerGame } from './screens/PlayerGame';
import { GameOver } from './screens/GameOver';

export default function App() {
  const [role, setRole] = useState<'admin' | 'player' | null>(null);
  const {
    room,
    currentPlayer,
    error,
    createRoom,
    joinRoom,
    startStudyPhase,
    move,
    submitAnswer
  } = useGameState();

  if (error) {
    return (
      <div className="card" style={{ maxWidth: '400px', margin: 'auto', textAlign: 'center' }}>
        <h3 style={{ color: '#d32f2f' }}>Error</h3>
        <p>{error}</p>
        <button className="btn" onClick={() => window.location.reload()}>
          Try Again
        </button>
      </div>
    );
  }

  if (!role) {
    return <Home onSelectRole={(selectedRole) => setRole(selectedRole)} />;
  }

  if (!room) {
    return (
      <JoinForm
        role={role}
        onSubmit={(code, name) => {
          if (role === 'admin') createRoom(code, name);
          else joinRoom(code, name);
        }}
        onBack={() => setRole(null)}
      />
    );
  }

  if (room.status === 'LOBBY' && role === 'admin') {
    return <AdminLobby room={room} onStartStudy={startStudyPhase} />;
  }

  if (room.status === 'LOBBY' && role === 'player') {
    return (
      <div className="card" style={{ maxWidth: '480px', margin: 'auto', textAlign: 'center' }}>
        <h2>Waiting in Lobby</h2>
        <p>Room Code: <strong>{room.code}</strong></p>
        <p>Waiting for the host to start the game...</p>
      </div>
    );
  }

  if (room.status === 'STUDY') {
    return <MazeStudy room={room} />;
  }

  if (room.status === 'PLAYING') {
    if (role === 'admin') {
      return <AdminGame room={room} />;
    }
    if (currentPlayer) {
      return (
        <PlayerGame
          room={room}
          player={currentPlayer}
          onMove={move}
          onAnswer={submitAnswer}
        />
      );
    }
  }

  if (room.status === 'ENDED') {
    return <GameOver room={room} />;
  }

  return <div>Loading...</div>;
}
