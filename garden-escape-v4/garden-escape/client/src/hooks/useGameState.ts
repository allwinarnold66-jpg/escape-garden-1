import { useState, useEffect } from 'react';
import { socket } from '../socket';
import { RoomState, Player } from '../types';

export function useGameState() {
  const [room, setRoom] = useState<RoomState | null>(null);
  const [currentPlayer, setCurrentPlayer] = useState<Player | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    function onRoomCreated(data: { room: RoomState; player: Player }) {
      setRoom(data.room);
      setCurrentPlayer(data.player);
      setError(null);
    }

    function onJoinedRoom(data: { room: RoomState; player: Player }) {
      setRoom(data.room);
      setCurrentPlayer(data.player);
      setError(null);
    }

    function onRoomUpdated(updatedRoom: RoomState) {
      setRoom(updatedRoom);
      if (currentPlayer) {
        const updatedSelf = updatedRoom.players.find((p) => p.id === currentPlayer.id);
        if (updatedSelf) setCurrentPlayer(updatedSelf);
      }
    }

    function onError(msg: string) {
      setError(msg);
    }

    socket.on('room_created', onRoomCreated);
    socket.on('joined_room', onJoinedRoom);
    socket.on('room_updated', onRoomUpdated);
    socket.on('error_message', onError);

    return () => {
      socket.off('room_created', onRoomCreated);
      socket.off('joined_room', onJoinedRoom);
      socket.off('room_updated', onRoomUpdated);
      socket.off('error_message', onError);
    };
  }, [currentPlayer]);

  const createRoom = (roomCode: string, adminName: string) => {
    socket.emit('create_room', { roomCode, adminName });
  };

  const joinRoom = (roomCode: string, name: string) => {
    socket.emit('join_room', { roomCode, name });
  };

  const startStudyPhase = () => {
    if (room) {
      socket.emit('start_study_phase', { roomCode: room.code });
    }
  };

  const move = (direction: 'FORWARD' | 'BACKWARD' | 'LEFT' | 'RIGHT') => {
    if (room) {
      socket.emit('move_player', { roomCode: room.code, direction });
    }
  };

  const submitAnswer = (answerIndex: number) => {
    if (room) {
      socket.emit('answer_question', { roomCode: room.code, answerIndex });
    }
  };

  return {
    room,
    currentPlayer,
    error,
    createRoom,
    joinRoom,
    startStudyPhase,
    move,
    submitAnswer
  };
}
