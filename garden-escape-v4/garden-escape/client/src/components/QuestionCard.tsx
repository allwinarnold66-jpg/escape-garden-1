import React from 'react';
import { Question } from '../types';

interface QuestionCardProps {
  question: Question;
  onAnswer: (index: number) => void;
}

export const QuestionCard: React.FC<QuestionCardProps> = ({ question, onAnswer }) => {
  return (
    <div className="card">
      <h3 style={{ color: '#1b5e20' }}>{question.question}</h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
        {question.options.map((option, idx) => (
          <button
            key={idx}
            className="btn"
            style={{ background: '#f1f8e9', color: '#2e7d32', border: '1px solid #c8e6c9', textAlign: 'left' }}
            onClick={() => onAnswer(idx)}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
};
