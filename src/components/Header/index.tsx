import { Button } from "../Button";
import { useDatabase } from "../../hooks/useDatabase";
import { useHistory } from "react-router-dom";
import { useContext } from "react";
import { ModalContext } from "../../contexts/ModalContext";
import { Modal } from "../../entities/Modal";
import { useUser } from "../../hooks/useUser";
import { CopySvg, DeleteSvg, LogoSvg } from "../../constants/vectors";

import "./styles.scss";

export const Header: React.FC<{ roomId: number; admin?: boolean }> = ({
  roomId,
  admin = false,
}) => {
  const history = useHistory();
  const { user, handleAuthSignOut } = useUser();
  const { setModal } = useContext(ModalContext);
  const database = useDatabase();

  const handleCopyRoom = () => {
    navigator.clipboard.writeText(roomId.toString());
  };

  const handleCloseRoom = () => {
    const modal = new Modal({
      icon: DeleteSvg,
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

  const handleUserLogout = async () => {
    await handleAuthSignOut();
    history.push("/");
  };

  return (
    <header>
      <div id="header-content">
        <LogoSvg />
        <div className="right-side">
          <div className="copy-room">
            <Button onClick={handleCopyRoom}>
              <CopySvg />
            </Button>
            <div>
              <span>Sala {roomId}</span>
            </div>
          </div>
          {admin ? (
            <Button variation="outlined" onClick={() => handleCloseRoom()}>
              Encerrar sala
            </Button>
          ) : (
            user && (
              <Button variation="outlined" onClick={() => handleUserLogout()}>
                Logout
              </Button>
            )
          )}
        </div>
      </div>
    </header>
  );
};
