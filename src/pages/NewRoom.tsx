import illustrationImg from "../assets/images/illustration.svg";
import logoImg from "../assets/images/logo.svg";
import { Button } from "../components/Button";
import { Link, useHistory } from "react-router-dom";
import { createRef, FormEvent } from "react";
import { Room } from "../entities/Room";
import firebase from "firebase/app";
import { Input } from "../components/Input";
import { useAuthContext } from "../hooks/useAuthContext";
import { useDatabase } from "../hooks/useDatabase";
import "../shared/initials.scss";

export function NewRoom() {
  const { user } = useAuthContext();
  const database = useDatabase();
  const history = useHistory();

  const roomNameField = createRef<HTMLInputElement>();

  const handleFormSubmit = (event: FormEvent) => {
    event.preventDefault();

    if (roomNameField.current?.value) {
      handleSaveOnDatabase(handleNewRoom(roomNameField.current.value));
    }
  };

  const handleSaveOnDatabase = async (room: Room) => {
    const roomReference = database.ref("rooms").child(String(room.uid));
    await roomReference.set(room);

    if (roomReference.key) {
      history.push(`/rooms/${roomReference.key}`);
    } else {
      throw new Error("Um erro ocorreu ao criar a sala");
    }
  };

  const handleNewRoom = (roomNameField: string) => {
    const hasRoomName = roomNameField.trim() !== "";
    if (hasRoomName && user) {
      return new Room(roomNameField, user);
    } else {
      throw new Error("Faltando nome da sala");
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
          <h2>Crie uma nova sala</h2>
          <form onSubmit={handleFormSubmit}>
            <Input ref={roomNameField} placeholder="Nome da sala" />
            <Button type="submit">Criar sala</Button>
          </form>
          <span className="return-page">
            Quer entrar em uma sala já existente?{" "}
            <Link to="/">Clique aqui</Link>
          </span>
        </div>
      </main>
    </div>
  );
}
