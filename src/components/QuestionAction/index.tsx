import { Action } from "../../entities/Action";
import { useQuestionActions } from "../../hooks/useQuestionActions";
import { Button } from "../Button";

export type QuestionActionProps = {
  action: Action;
  questionUid: string;
};

export const QuestionAction: React.FC<QuestionActionProps> = (props) => {
  const { handleQuestionAction } = useQuestionActions(props.questionUid);

  const handleActionClick = () => {
    handleQuestionAction(props.action.name, props.action.prevValue);
  };

  return (
    <Button
      title={props.action.label}
      id={props.action.prevValue ? "active" : ""}
      variation={"transparent"}
      onClick={handleActionClick}
    >
      {props.children}
    </Button>
  );
};
