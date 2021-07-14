import { useEffect, useState } from "react";
import { Question } from "../entities/Question";
import { Room } from "../entities/Room";
import { useDatabase } from "../hooks/useDatabase";

export const useRoom = ({ roomId }: { roomId: number }) => {
  const database = useDatabase();
  const [room, setRoom] = useState<Room>();
  const [questions, setQuestions] = useState<Question[]>([]);
  const roomReference = database.ref(`/rooms/${roomId}`);

  useEffect(() => {
    roomReference.child("questions").on("value", (newQuestion) => {
      const questions = newQuestion.val();

      if (questions) {
        const newQuestions = Object.keys(questions).map((key) => {
          return questions[key];
        });

        setQuestions(newQuestions);
      }
    });
  }, []);

  useEffect(() => {
    handleGetInitialState();

    return () => {
      return roomReference.off();
    };
  }, []);

  const handleGetInitialState = async () => {
    const room = await roomReference.get();

    if (room.exists()) {
      setRoom(room.val());
    }
  };

  return { room, questions };
};
