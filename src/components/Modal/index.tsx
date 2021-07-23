import { useContext } from "react";
import { ModalContext } from "../../contexts/ModalContext";
import { Button } from "../Button";

import "./styles.scss";

export const Modal = () => {
  const { modal, setModal } = useContext(ModalContext);

  if (modal) {
    return (
      <section id="modal-container">
        <div>
          {modal.icon && <modal.icon />}
          <h2>{modal.title}</h2>
          <p>{modal.description}</p>
          <div className="modal-actions">
            <Button onClick={() => setModal(undefined)} variation={"cancel"}>
              Cancel
            </Button>
            <Button onClick={modal.onAccept} variation={"danger"}>
              Sim, {modal.title.split(" ")[0].toLowerCase()}
            </Button>
          </div>
        </div>
      </section>
    );
  }

  return null;
};
