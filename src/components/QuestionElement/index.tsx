import React, { memo } from "react";
import { Question } from "../../entities/Question";
import { Profile } from "../Profile";

import "./styles.scss";

interface IQuestion extends Question {
  [key: string]: any;
}

export const QuestionElement: React.FC<{
  question: IQuestion;
  actions: React.ReactNode;
}> = memo(({ question, actions }) => {
  const handleGetQuestionClassName = () => {
    let defaultClassName = "question";
    const variations = ["hidden", "highlighted"];

    variations.forEach((variation) => {
      if (question[variation]) defaultClassName += ` ${variation}`;
    });

    return defaultClassName;
  };

  return (
    <div className={handleGetQuestionClassName()}>
      <p>{question.content}</p>
      <div className="question-bottom">
        <Profile user={question.user} />
        <div className="question-actions">{actions}</div>
      </div>
    </div>
  );
});
