import { useState } from "react";
import { useEffect } from "react";
import { Header } from "../components/Header";
import { QuestionForm } from "../components/QuestionForm";
import { RoomLoading } from "../components/RoomLoading";
import { useGetRoomUid } from "../hooks/useGetRoomUid";
import { useRoom } from "../hooks/useRoom";
import { Questions } from "../components/Questions";
import "../styles/Room.scss";

import { ReactComponent as Check } from "../../assets/images/check.svg";
import { ReactComponent as Answer } from "../../assets/images/answer.svg";
import { ReactComponent as Delete } from "../../assets/images/delete.svg";

import { ActionBuilder, Action } from "../entities/Action";

export const Room = () => {
  const [isLoading, setIsLoading] = useState(true);
  const actionBuilder = new ActionBuilder();
  const { room, questions } = useRoom({
    roomId: useGetRoomUid(),
  });

  const actions: Action[] = [
    actionBuilder
      .setName("hide")
      .setIcon(Check)
      .setLabel("Esconder questão")
      .getAction(),
    actionBuilder
      .setName("highlight")
      .setIcon(Answer)
      .setLabel("Destacar questão")
      .getAction(),
    actionBuilder
      .setName("delete")
      .setIcon(Delete)
      .setLabel("Deletar questão")
      .getAction(),
  ];

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
            <Questions actions={actions} questions={questions} />
          </main>
        </div>
      )}
    </>
  );
};
