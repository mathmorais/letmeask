import { useState } from "react";
import { Button } from "../Button";

type QuestionActionProps = {
  onClick: () => void;
};

export const QuestionAction: React.FC<QuestionActionProps> = ({
  onClick,
  children,
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
      {children}
    </Button>
  );
};
