import logoImg from "../../assets/images/logo.svg";
import copyImg from "../../assets/images/copy.svg";
import { Button } from "../Button";
import "./styles.scss";
import { useDatabase } from "../../hooks/useDatabase";
import { useHistory } from "react-router-dom";

export const Header: React.FC<{ roomId: number; admin?: boolean }> = ({
  roomId,
  admin = false,
}) => {
  const history = useHistory();
  const database = useDatabase();

  const handleCopyRoom = () => {
    navigator.clipboard.writeText(roomId.toString());
  };

  const handleCloseRoom = () => {
    database.ref(`/rooms/${roomId}`).remove(() => {
      history.replace("/");
    });
  };

  return (
    <header>
      <div id="header-content">
        <img src={logoImg} alt="Letmeask Logo" />
        <div className="right-side">
          <div className="copy-room">
            <Button onClick={handleCopyRoom}>
              <img src={copyImg} alt="Copiar" />
            </Button>
            <div>
              <span>Sala {roomId}</span>
            </div>
          </div>
          {admin && <Button onClick={() => {}}>Encerrar sala</Button>}
        </div>
      </div>
    </header>
  );
};
