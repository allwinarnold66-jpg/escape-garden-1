import { roomManager } from './roomManager.js';
import { moveFromDirection } from './maze.js';

export function setupGameHandlers(io, socket) {
  socket.on('create_room', ({ roomCode, adminName }) => {
    let room = roomManager.getRoom(roomCode);
    if (!room) {
      room = roomManager.createRoom(roomCode);
    }
    const admin = roomManager.joinRoom(roomCode, socket.id, adminName, true);
    socket.join(roomCode);
    socket.emit('room_created', { room: roomManager.getSerializedRoom(roomCode), player: admin });
  });

  socket.on('join_room', ({ roomCode, name }) => {
    const room = roomManager.getRoom(roomCode);
    if (!room) {
      socket.emit('error_message', 'Room not found.');
      return;
    }

    if (room.status !== 'LOBBY') {
      socket.emit('error_message', 'Game has already started.');
      return;
    }

    const player = roomManager.joinRoom(roomCode, socket.id, name, false);
    socket.join(roomCode);

    io.to(roomCode).emit('room_updated', roomManager.getSerializedRoom(roomCode));
    socket.emit('joined_room', { room: roomManager.getSerializedRoom(roomCode), player });
  });

  socket.on('start_study_phase', ({ roomCode }) => {
    const room = roomManager.getRoom(roomCode);
    if (!room) return;

    room.status = 'STUDY';
    io.to(roomCode).emit('room_updated', roomManager.getSerializedRoom(roomCode));

    let countdown = room.studyTimer;
    const interval = setInterval(() => {
      countdown -= 1;
      room.studyTimer = countdown;
      io.to(roomCode).emit('study_timer_tick', countdown);

      if (countdown <= 0) {
        clearInterval(interval);
        room.status = 'PLAYING';
        io.to(roomCode).emit('room_updated', roomManager.getSerializedRoom(roomCode));
      }
    }, 1000);
  });

  socket.on('move_player', ({ roomCode, direction }) => {
    const room = roomManager.getRoom(roomCode);
    if (!room || room.status !== 'PLAYING') return;

    const player = room.players.get(socket.id);
    if (!player || player.hasEscaped) return;

    const result = moveFromDirection(room.maze, player.nodeId, player.facing, direction);
    if (result) {
      player.nodeId = result.newId;
      player.facing = result.newFacing;

      if (player.nodeId === room.maze.finish) {
        player.hasEscaped = true;
        if (!room.winner) {
          room.winner = player;
        }
      }

      io.to(roomCode).emit('room_updated', roomManager.getSerializedRoom(roomCode));
    }
  });

  socket.on('answer_question', ({ roomCode, answerIndex }) => {
    const room = roomManager.getRoom(roomCode);
    if (!room) return;

    const player = room.players.get(socket.id);
    if (!player) return;

    const currentQ = room.questions[player.currentQuestionIndex];
    if (currentQ && answerIndex === currentQ.correctAnswer) {
      player.score += 10;
    }

    player.currentQuestionIndex += 1;
    socket.emit('question_result', {
      score: player.score,
      nextQuestionIndex: player.currentQuestionIndex
    });
    io.to(roomCode).emit('room_updated', roomManager.getSerializedRoom(roomCode));
  });

  socket.on('disconnect', () => {
    const roomCode = roomManager.removePlayer(socket.id);
    if (roomCode) {
      io.to(roomCode).emit('room_updated', roomManager.getSerializedRoom(roomCode));
    }
  });
}
