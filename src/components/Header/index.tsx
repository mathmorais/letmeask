import logoImg from "../../assets/images/logo.svg";
import copyImg from "../../assets/images/copy.svg";
import { Button } from "../Button";
import "./styles.scss";
import { useDatabase } from "../../hooks/useDatabase";
import { useHistory } from "react-router-dom";
import { useContext } from "react";
import { ModalContext } from "../../contexts/ModalContext";
import { Modal } from "../../entities/Modal";

import { ReactComponent as DeleteIcon } from "../../assets/images/delete.svg";

export const Header: React.FC<{ roomId: number; admin?: boolean }> = ({
  roomId,
  admin = false,
}) => {
  const history = useHistory();
  const { setModal } = useContext(ModalContext);
  const database = useDatabase();

  const handleCopyRoom = () => {
    navigator.clipboard.writeText(roomId.toString());
  };

  const handleCloseRoom = () => {
    const modal = new Modal({
      icon: DeleteIcon,
      title: "Encerrar sala",
      description: "Tem certeza que você deseja encerrar esta sala?",
      onAccept: () => {
        database.ref(`/rooms/${roomId}`).remove(() => {
          setModal(undefined);
          history.replace("/");
        });
      },
    });

    setModal(modal);
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
          {admin && (
            <Button onClick={() => handleCloseRoom()}>Encerrar sala</Button>
          )}
        </div>
      </div>
    </header>
  );
};
