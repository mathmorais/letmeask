import illustrationImg from "../assets/images/illustration.svg";
import logoImg from "../assets/images/logo.svg";
import { Button } from "../components/Button";
import "../shared/initials.scss";
import { Link, useHistory } from "react-router-dom";
import { createRef, FormEvent } from "react";
import { firebaseConnection } from "../services/firebase/connection";
import { Room } from "../entities/Room";
import firebase from "firebase/app";
import { Input } from "../components/Input";
import { useAuthContext } from "../hooks/useAuthContext";

export function NewRoom() {
  const { user } = useAuthContext();
  const history = useHistory();

  const roomName = createRef<HTMLInputElement>();

  const handleFormSubmit = (event: FormEvent) => {
    event.preventDefault();

    if (!firebaseConnection.isInitialized) return;

    if (roomName.current) {
      try {
        const reference = handleGetDatabaseReference();
        handleSaveOnDatabase(reference, handleNewRoom(roomName.current.value));
      } catch (err) {
        console.log(err);
      }
    }
  };

  const handleRedirect = (roomKey: string) => {
    return history.push(`/rooms/${roomKey}`);
  };

  const handleSaveOnDatabase = async (
    databaseReference: firebase.database.Reference,
    room: Room
  ) => {
    const roomReference = databaseReference.child(room.uid.toString());
    await roomReference.set(room);
    if (roomReference.key) {
      handleRedirect(roomReference.key);
    } else {
      throw new Error("A key don't exist in the room created");
    }
  };

  const handleGetDatabaseReference = () => {
    const reference = firebaseConnection.services.database!.ref("rooms");
    return reference;
  };

  const handleNewRoom = (roomName: string) => {
    const hasARoomName: boolean = roomName.trim() !== "";
    if (hasARoomName && user) {
      return new Room(roomName, user);
    } else {
      throw new Error("Missing room name");
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
            <Input ref={roomName} placeholder="Nome da sala" />
            <Button type="submit">Criar sala</Button>
          </form>
          <span className="return-page">
            Quer entrar em uma sala já existente?{" "}
            <Link to="/" aria-label="Voltar para a pagina de conectar em salas">
              Clique aqui
            </Link>
          </span>
        </div>
      </main>
    </div>
  );
}
