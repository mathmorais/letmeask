import { Question } from "../../entities/Question";
import { Profile } from "../Profile";

import { ReactComponent as Check } from "../../assets/images/check.svg";
import { ReactComponent as Answer } from "../../assets/images/answer.svg";
import { ReactComponent as Delete } from "../../assets/images/delete.svg";
import { ReactComponent as Like } from "../../assets/images/like.svg";

import "./styles.scss";
import { QuestionAction } from "../QuestionAction";

export const QuestionElement: React.FC<{
  question: Question;
  actions?: typeof QuestionAction[];
}> = (props) => {
  return (
    <div className="question">
      <p>{props.question.content}</p>
      <div className="question-bottom">
        <Profile user={props.question.user} />
        <div className="question-actions">{props.actions}</div>
      </div>
    </div>
  );
};
