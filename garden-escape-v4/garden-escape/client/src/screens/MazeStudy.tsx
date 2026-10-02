import React from 'react';
import { RoomState } from '../types';

interface MazeStudyProps {
  room: RoomState;
}

export const MazeStudy: React.FC<MazeStudyProps> = ({ room }) => {
  return (
    <div className="card" style={{ maxWidth: '600px', margin: 'auto', textAlign: 'center' }}>
      <h2>Study Phase</h2>
      <p>Memorize the questions and prepare for the maze navigation!</p>
      <div style={{ fontSize: '2rem', color: '#2e7d32', fontWeight: 'bold' }}>
        Time Remaining: {room.studyTimer}s
      </div>

      <div style={{ textAlign: 'left', marginTop: '1rem' }}>
        <h3>Questions Preview</h3>
        {room.questions.map((q, idx) => (
          <div key={q.id} style={{ marginBottom: '1rem', background: '#f9f9f9', padding: '1rem', borderRadius: '8px' }}>
            <strong>Q{idx + 1}: {q.question}</strong>
            <ul style={{ marginTop: '0.5rem', paddingLeft: '1.2rem' }}>
              {q.options.map((opt, oIdx) => (
                <li key={oIdx}>{opt}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};
