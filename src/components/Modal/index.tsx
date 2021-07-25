import { useContext } from "react";
import { ModalContext } from "../../contexts/ModalContext";
import { Button } from "../Button";
import { animated, config, useTransition } from "react-spring";

import "./styles.scss";

export const Modal = () => {
  const { modal, setModal } = useContext(ModalContext);

  const transition = useTransition(modal, {
    from: { filter: "opacity(0)" },
    enter: { filter: "opacity(1)" },
    config: config.stiff,
    expires: modal === undefined,
  });

  return transition(
    (style, item) =>
      item && (
        <animated.section style={style} id="modal-container">
          <div>
            {item.icon && <item.icon />}
            <h2>{item.title}</h2>
            <p>{item.description}</p>
            <div className="modal-actions">
              <Button onClick={() => setModal(undefined)} variation={"cancel"}>
                Cancel
              </Button>
              <Button onClick={item.onAccept} variation={"danger"}>
                Sim, {item.title.split(" ")[0].toLowerCase()}
              </Button>
            </div>
          </div>
        </animated.section>
      )
  );
};
