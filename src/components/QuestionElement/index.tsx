import React from "react";
import { Question } from "../../entities/Question";
import { Profile } from "../Profile";

import "./styles.scss";

export const QuestionElement: React.FC<{
  question: Question;
  actions: React.ReactNode;
}> = ({ question, actions }) => {
  return (
    <div className="question">
      <p>{question.content}</p>
      <div className="question-bottom">
        <Profile user={question.user} />
        <div className="question-actions">{actions}</div>
      </div>
    </div>
  );
};
