import { memo } from "react";

import { Question } from "../../entities/Question";
import { ReactComponent as EmptyQuestion } from "../../assets/images/empty-questions.svg";
import { QuestionElement } from "../QuestionElement";
import "./styles.scss";

import { QuestionAction } from "../QuestionAction";
import { Action, ActionBuilder } from "../../entities/Action";

interface IQuestionProps {
  questions: Question[];
  actions: Action[];
}

export const Questions = memo(({ questions, actions }: IQuestionProps) => {
  const handleRenderActions = (question: Question) => {
    return actions.map((action, index) => (
      <QuestionAction
        key={index}
        arial-label={action.label}
        action={action}
        questionUid={question.uid!}
      >
        <action.icon />
      </QuestionAction>
    ));
  };

  const handleRenderQuestions = () => {
    return questions
      .map((question) => {
        return (
          <QuestionElement
            actions={handleRenderActions(question)}
            key={question.uid}
            question={question}
          />
        );
      })
      .reverse();
  };

  if (questions.length > 0) {
    return (
      <section id="questions-container">{handleRenderQuestions()}</section>
    );
  } else {
    return (
      <div className="questions-fallback">
        <EmptyQuestion />
        <h4>Nenhuma pergunta por aqui...</h4>
        <p>Faça o seu login e seja a primeira pessoa a fazer uma pergunta!</p>
      </div>
    );
  }
});
