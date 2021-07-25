import { useState } from "react";
import { useEffect } from "react";
import { Header } from "../components/Header";
import { QuestionForm } from "../components/QuestionForm";
import { RoomLoading } from "../components/RoomLoading";
import { useGetRoomUid } from "../hooks/useGetRoomUid";
import { useRoom } from "../hooks/useRoom";
import { Questions } from "../components/Questions";
import { Modal } from "../components/Modal";
import { Link } from "react-router-dom";

import "../styles/Room.scss";
import { EmptyQuestionSvg } from "../constants/vectors";

export const Room = () => {
  const [isLoading, setIsLoading] = useState(true);
  const roomId = useGetRoomUid();
  const { room, questions } = useRoom({ roomId });
  const maxLoadingTime = 5000;

  useEffect(() => {
    if (room && questions) {
      setIsLoading(false);
    }
  }, [room, questions]);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, maxLoadingTime);
  }, []);

  return (
    <div id="room-container">
      <RoomLoading isLoading={isLoading} />
      <Header roomId={roomId} />
      <main>
        {room && questions ? (
          <div className="content">
            <Modal />
            <div className="title-container">
              <h1>{room.title}</h1>
              {questions.length > 0 && <h3>{questions.length} pergunta(s)</h3>}
            </div>
            <QuestionForm roomId={room.uid} />
            <Questions questions={questions} />
          </div>
        ) : (
          <div className="error-message">
            <EmptyQuestionSvg />
            <h1>Ocorreu um erro ao carregar a sala</h1>
            <p>
              Talvez a sala não existe ou tenha sido encerrada
              <br />
              Pressione <Link to="/">aqui</Link> para voltar
            </p>
          </div>
        )}
      </main>
    </div>
  );
};
