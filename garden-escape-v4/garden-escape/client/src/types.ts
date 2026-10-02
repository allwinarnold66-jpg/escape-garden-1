export interface Player {
  id: string;
  name: string;
  isAdmin: boolean;
  nodeId: number;
  facing: 'N' | 'E' | 'S' | 'W';
  score: number;
  currentQuestionIndex: number;
  hasEscaped: boolean;
}

export interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
}

export interface MazeNode {
  id: number;
  row: number;
  col: number;
  open: { N: boolean; E: boolean; S: boolean; W: boolean };
}

export interface MazeData {
  size: number;
  nodes: MazeNode[];
  start: number;
  finish: number;
}

export interface RoomState {
  code: string;
  status: 'LOBBY' | 'STUDY' | 'PLAYING' | 'ENDED';
  maze: MazeData;
  questions: Question[];
  studyTimer: number;
  gameTimer: number;
  winner: Player | null;
  players: Player[];
}
