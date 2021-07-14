import { useState } from "react";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Header } from "../components/Header";
import { QuestionForm } from "../components/QuestionForm";
import { Questions } from "../components/Questions";
import { RoomLoading } from "../components/RoomLoading";
import { useRoom } from "../hooks/useRoom";
import "../styles/Room.scss";

export const Room = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { room, questions } = useRoom({
    roomId: Number(useLocation().pathname.split("/")[2]),
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
            <Questions questions={questions} />
          </main>
        </div>
      )}
    </>
  );
};
