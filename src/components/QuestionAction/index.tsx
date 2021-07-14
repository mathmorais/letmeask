import { useState } from "react";
import { Button } from "../Button";

type QuestionActionProps = {
  icon: React.FunctionComponent;
  onClick: () => void;
};

export const QuestionAction: React.FC<QuestionActionProps> = ({
  icon,
  onClick,
}) => {
  const [isClicked, setIsClicked] = useState<boolean>(false);

  return (
    <Button
      id={isClicked ? "active" : ""}
      variation={"transparent"}
      onClick={() => {
        setIsClicked(!isClicked);
        onClick();
      }}
    >
      {icon}
    </Button>
  );
};
