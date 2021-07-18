import { memo } from "react";

import { Question } from "../../entities/Question";
import { ReactComponent as EmptyQuestion } from "../../assets/images/empty-questions.svg";
import { QuestionElement } from "../QuestionElement";
import "./styles.scss";

import { ReactComponent as Check } from "../../assets/images/check.svg";
import { ReactComponent as Answer } from "../../assets/images/answer.svg";
import { ReactComponent as Delete } from "../../assets/images/delete.svg";
import { ReactComponent as Like } from "../../assets/images/like.svg";

import { QuestionAction } from "../QuestionAction";
import { useQuestionActions } from "../../hooks/useQuestionActions";

export const Questions = memo(
  ({ questions }: { questions: Question[]; roomId: number }) => {
    const { handleQuestionAction } = useQuestionActions();

    const handleRenderQuestions = () => {
      return questions
        .map((question) => {
          if (question) {
            const actions = [
              //  ( refactoring of tomorrow ) on QuestionAction receive an action unless a function
              // then... change the properties (isHidden, isHighlighted) to just hidden and hightlighted,
              // to make more easier to access these properties by a string
              <QuestionAction
                onClick={() =>
                  handleQuestionAction(
                    question.uid!,
                    "highlight",
                    question.isHighlighted
                  )
                }
              >
                <Answer />
              </QuestionAction>,
              <QuestionAction
                onClick={() => handleQuestionAction(question.uid!, "delete")}
              >
                <Delete />
              </QuestionAction>,
            ];

            return (
              <QuestionElement
                actions={actions}
                key={question.uid}
                question={question}
              />
            );
          } else {
            return undefined;
          }
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
  }
);
