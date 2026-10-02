import React from 'react';
import { RoomState, Player } from '../types';
import { MazeScene } from '../three/MazeScene';
import { QuestionCard } from '../components/QuestionCard';
import { DirectionButtons } from '../components/DirectionButtons';

interface PlayerGameProps {
  room: RoomState;
  player: Player;
  onMove: (dir: 'FORWARD' | 'BACKWARD' | 'LEFT' | 'RIGHT') => void;
  onAnswer: (index: number) => void;
}

export const PlayerGame: React.FC<PlayerGameProps> = ({ room, player, onMove, onAnswer }) => {
  const currentQ = room.questions[player.currentQuestionIndex];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div className="card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h2>Player: {player.name}</h2>
          <div>Score: <strong>{player.score}</strong></div>
        </div>
        <MazeScene maze={room.maze} players={room.players} currentPlayerId={player.id} />
        <DirectionButtons onMove={onMove} />
      </div>

      {currentQ ? (
        <QuestionCard question={currentQ} onAnswer={onAnswer} />
      ) : (
        <div className="card">
          <h3>All Questions Answered!</h3>
          <p>Navigate your way to the exit node!</p>
        </div>
      )}
    </div>
  );
};
