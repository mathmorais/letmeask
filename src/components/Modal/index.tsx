import { useState } from "react";
import { Button } from "../Button";

import "./styles.scss";

interface IModalProps {
  title: string;
  description: string;
  icon?: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
  onAccept: () => void;
}

export const Modal: React.FC<IModalProps> = (props) => {
  const [accepted, setAccepted] = useState(false);

  if (!accepted) {
    return (
      <section id="modal-container">
        <div>
          {props.icon && <props.icon />}
          <h2>{props.title}</h2>
          <p>{props.description}</p>
          <div className="modal-actions">
            <Button onClick={() => setAccepted(false)} variation={"cancel"}>
              Cancel
            </Button>
            <Button onClick={props.onAccept} variation={"danger"}>
              Sim, {props.title.split(" ")[0].toLowerCase()}
            </Button>
          </div>
        </div>
      </section>
    );
  }

  return null;
};
