# Garden Escape

Multiplayer educational maze escape game built with Node.js, Express, Socket.IO, React, Three.js (@react-three/fiber), and TypeScript.

## Project Structure

```
garden-escape/
├── server/
│   ├── server.js
│   ├── gameManager.js
│   ├── roomManager.js
│   ├── maze.js
│   ├── questions.js
│   └── package.json
│
├── client/
│   ├── index.html
│   ├── package.json
│   ├── vite.config.ts
│   ├── tsconfig.json
│   └── src/
│       ├── main.tsx
│       ├── App.tsx
│       ├── App.css
│       ├── socket.ts
│       ├── types.ts
│       ├── vite-env.d.ts
│       ├── hooks/
│       │   └── useGameState.ts
│       ├── three/
│       │   └── MazeScene.tsx
│       ├── components/
│       │   ├── QuestionCard.tsx
│       │   └── DirectionButtons.tsx
│       └── screens/
│           ├── Home.tsx
│           ├── JoinForm.tsx
│           ├── AdminLobby.tsx
│           ├── MazeStudy.tsx
│           ├── AdminGame.tsx
│           ├── PlayerGame.tsx
│           └── GameOver.tsx
└── README.md
```

## Getting Started

### Backend
```bash
cd server
npm install
npm run dev
```

### Frontend
```bash
cd client
npm install
npm run dev
```
