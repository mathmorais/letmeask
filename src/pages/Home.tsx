import { useHistory } from "react-router-dom";
import { useUser } from "../hooks/useUser";
import { createRef, FormEvent } from "react";
import { GoogleIconSvg, IllustrationSvg, LogoSvg } from "../constants/vectors";

import "../styles/Home.scss";
import { useDatabase } from "../hooks/useDatabase";
import { Button } from "../components/Button";
import { Input } from "../components/Input";

export function Home() {
  const history = useHistory();
  const { user, handleAuthSignIn } = useUser();
  const database = useDatabase();
  const roomCodeField = createRef<HTMLInputElement>();

  const handleCreateRoomRedirect = async () => {
    if (!user) {
      await handleAuthSignIn();
    }
    history.push("/rooms/new");
  };

  const handleGetRoom = async (roomId: string) => {
    const reference = `rooms/${roomId}`;
    const room = database.ref(reference);
    return await room.get();
  };

  const handleFormSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (roomCodeField.current?.value) {
      const room = await handleGetRoom(roomCodeField.current.value);
      return room.exists() && history.push(`/rooms/${room.key}`);
    }
  };

  return (
    <div id="initials-container">
      <aside className="side">
        <div id="aside-content">
          <IllustrationSvg />
          <h1>Toda pergunta tem uma resposta</h1>
          <p>Aprenda e compartilhe conhecimento com outras pessoas</p>
        </div>
      </aside>
      <main className="side">
        <div id="main-content">
          <LogoSvg />
          <Button
            style={{ background: "#EA4335" }}
            onClick={handleCreateRoomRedirect}
          >
            <GoogleIconSvg />
            Crie sua sala com o google
          </Button>
          <div className="separator">
            <span>ou entre em uma sala</span>
          </div>
          <form onSubmit={handleFormSubmit}>
            <Input
              type="number"
              ref={roomCodeField}
              placeholder="Digite o código da sala"
            />
            <Button type="submit">Entrar na sala</Button>
          </form>
        </div>
      </main>
    </div>
  );
}
