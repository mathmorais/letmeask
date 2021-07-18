import { useState } from "react";
import { useEffect } from "react";
import { Header } from "../components/Header";
import { QuestionForm } from "../components/QuestionForm";
import { RoomLoading } from "../components/RoomLoading";
import { useGetRoomUid } from "../hooks/useGetRoomUid";
import { useRoom } from "../hooks/useRoom";
import { Questions } from "../components/Questions";
import "../styles/Room.scss";

export const Room = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { room, questions } = useRoom({
    roomId: useGetRoomUid(),
  });

  useEffect(() => {
    if (room && questions) {
      setIsLoading(false);
    }
  }, [room, questions]);

  return (
    <>
      <RoomLoading isLoading={isLoading} />
      {room && questions && (
        <div id="room-container">
          <Header roomId={room.uid} />
          <main>
            <div className="title-container">
              <h1>{room.title}</h1>
              {questions.length > 0 && <h3>{questions.length} pergunta(s)</h3>}
            </div>
            <QuestionForm roomId={room.uid} />
            <Questions roomId={room.uid} questions={questions} />
          </main>
        </div>
      )}
    </>
  );
};
