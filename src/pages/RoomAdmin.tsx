import { useState } from "react";
import { useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { Header } from "../components/Header";
import { Questions } from "../components/Questions";
import { RoomLoading } from "../components/RoomLoading";
import { useAuthContext } from "../hooks/useAuthContext";
import { useRoom } from "../hooks/useRoom";
import "../styles/Room.scss";

export const RoomAdmin = () => {
  const [isLoading, setIsLoading] = useState(true);
  const roomId = useLocation().pathname.split("/")[2];
  const history = useHistory();
  const { user } = useAuthContext();
  const { room, questions } = useRoom({
    roomId: Number(roomId),
  });

  const handleCheckUserIsOwner = () => {
    if (user?.uid !== room!.authorId) {
      history.replace(`/rooms/${roomId}`);
    }
  };

  useEffect(() => {
    if (room && questions) {
      setIsLoading(false);
      handleCheckUserIsOwner();
    }
  }, [room, questions]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      <RoomLoading isLoading={isLoading} />
      {room && questions && (
        <div id="room-container">
          <Header admin roomId={room.uid} />
          <main>
            <div className="title-container">
              <h1>{room.title}</h1>
              {questions.length && <h3>{questions.length} perguntas</h3>}
            </div>
            <Questions questions={questions} />
          </main>
        </div>
      )}
    </>
  );
};
