import { useState } from "react";
import { useEffect } from "react";
import { Header } from "../components/Header";
import { QuestionForm } from "../components/QuestionForm";
import { Questions } from "../components/Questions";
import { RoomLoading } from "../components/RoomLoading";
import { useGetRoomUid } from "../hooks/useGetRoomUid";
import { useRoom } from "../hooks/useRoom";
import "../styles/Room.scss";

export const RoomAdmin = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { room } = useRoom({
    roomId: useGetRoomUid(),
  });

  useEffect(() => {
    if (room) {
      setIsLoading(false);
    }
  }, [room]);

  return (
    <>
      {/* <RoomLoading isLoading={isLoading} />
      {room && (
        <div id="room-container">
          <Header roomId={room.uid} />
          <main>
            <div className="title-container">
              <h1>{room.title}</h1>
              {Object.keys(room.questions!).length > 0 && (
                <h3>{Object.keys(room.questions!).length} pergunta(s)</h3>
              )}
            </div>
            <QuestionForm roomId={room.uid} />
            <Questions />
          </main>
        </div>
      )} */}
    </>
  );
};
