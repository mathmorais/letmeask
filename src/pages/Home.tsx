import illustrationImg from "../assets/images/illustration.svg";
import logoImg from "../assets/images/logo.svg";
import googleIconImg from "../assets/images/google-icon.svg";
import { Button } from "../components/Button";
import { useHistory } from "react-router-dom";
import "../shared/initials.scss";
import { useAuthContext } from "../hooks/useAuthContext";
import { firebaseConnection } from "../services/firebase/connection";
import { createRef, FormEvent } from "react";
import firebase from "firebase/app";
import { useState } from "react";
import { Input } from "../components/Input";

export function Home() {
  const history = useHistory();
  const { user, handleAuthSignIn } = useAuthContext();
  const roomCodeField = createRef<HTMLInputElement>();
  const [error, setError] = useState<string>();

  const handleCreateRoomRedirect = async () => {
    if (!user) {
      await handleAuthSignIn();
    }
    history.push("/rooms/new");
  };

  const handleGetRoom = async (roomId: string) => {
    const reference = `rooms/${roomId}`;
    const room = firebaseConnection.services.database!.ref(reference);
    return await room.get();
  };

  const handleCheckRoomExists = (room: firebase.database.DataSnapshot) => {
    if (!room.exists()) {
      throw new Error("Essa sala não existe ou foi encerrada.");
    }
    return room;
  };

  const handleFormSubmit = async (event: FormEvent) => {
    event.preventDefault();
    handleResetError();

    if (roomCodeField.current?.value) {
      try {
        const room = handleCheckRoomExists(
          await handleGetRoom(roomCodeField.current.value)
        );
        return history.push(`/rooms/${room.key}`);
      } catch (err) {
        setError(err.message);
      }
    } else {
      setError("Preencha o código da sala");
    }
  };

  const handleResetError = () => {
    if (error !== undefined) {
      setError(undefined);
    }
  };

  return (
    <div id="initials-container">
      <aside className="side">
        <div id="aside-content">
          <img
            alt="Circles illustration"
            src={illustrationImg}
            draggable={false}
          />
          <h1>Toda pergunta tem uma resposta</h1>
          <p>Aprenda e compartilhe conhecimento com outras pessoas</p>
        </div>
      </aside>
      <main className="side">
        <div id="main-content">
          <img draggable={false} alt="Letmeask logo" src={logoImg} />
          <Button
            style={{ background: "#EA4335" }}
            onClick={handleCreateRoomRedirect}
          >
            <img draggable={false} src={googleIconImg} alt="Google logo" />
            Crie sua sala com o google
          </Button>
          <div className="separator">
            <span>ou entre em uma sala</span>
          </div>
          <form onSubmit={handleFormSubmit}>
            <Input
              style={{ borderColor: !error ? "#a8a8b3" : "#ea4335" }}
              type="number"
              ref={roomCodeField}
              placeholder="Digite o código da sala"
              hintText={error}
            />

            <Button type="submit">Entrar na sala</Button>
          </form>
        </div>
      </main>
    </div>
  );
}
