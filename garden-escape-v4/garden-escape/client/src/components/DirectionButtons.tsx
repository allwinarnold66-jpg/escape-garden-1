import React from 'react';
import { ArrowUp, ArrowDown, ArrowLeft, ArrowRight } from 'lucide-react';

interface DirectionButtonsProps {
  onMove: (direction: 'FORWARD' | 'BACKWARD' | 'LEFT' | 'RIGHT') => void;
}

export const DirectionButtons: React.FC<DirectionButtonsProps> = ({ onMove }) => {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 50px)', gap: '8px', justifyContent: 'center' }}>
      <div />
      <button className="btn" onClick={() => onMove('FORWARD')} style={{ padding: '10px' }} title="Forward">
        <ArrowUp size={20} />
      </button>
      <div />
      <button className="btn" onClick={() => onMove('LEFT')} style={{ padding: '10px' }} title="Turn Left">
        <ArrowLeft size={20} />
      </button>
      <button className="btn" onClick={() => onMove('BACKWARD')} style={{ padding: '10px' }} title="Backward">
        <ArrowDown size={20} />
      </button>
      <button className="btn" onClick={() => onMove('RIGHT')} style={{ padding: '10px' }} title="Turn Right">
        <ArrowRight size={20} />
      </button>
    </div>
  );
};
