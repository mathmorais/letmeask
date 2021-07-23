import { memo } from "react";

import { Question } from "../../entities/Question";
import { ReactComponent as EmptyQuestion } from "../../assets/images/empty-questions.svg";
import { QuestionElement } from "../QuestionElement";
import "./styles.scss";

import { ReactComponent as CheckIcon } from "../../assets/images/check.svg";
import { ReactComponent as AnswerIcon } from "../../assets/images/answer.svg";
import { ReactComponent as DeleteIcon } from "../../assets/images/delete.svg";
import { ReactComponent as LikeIcon } from "../../assets/images/like.svg";

import { QuestionAction } from "../QuestionAction";
import { ActionBuilder } from "../../entities/Action";
import { useLikedCookies } from "../../hooks/useLikedCookies";

interface IQuestionProps {
  questions: Question[];
  admin?: boolean;
}

export const Questions = memo(
  ({ admin = false, questions }: IQuestionProps) => {
    const actionBuilder = new ActionBuilder();
    const { handleFindLikedQuestion } = useLikedCookies();

    const handleRenderActions = (question: Question) => {
      const actions = {
        user: [
          actionBuilder
            .setName("like")
            .setIcon(LikeIcon)
            .setLabel("Gostei")
            .setPrevValue(handleFindLikedQuestion(question.uid!))
            .getAction(),
        ],
        admin: [
          actionBuilder
            .setName("hide")
            .setIcon(CheckIcon)
            .setLabel("Esconder questão")
            .setPrevValue(question.hidden)
            .getAction(),
          actionBuilder
            .setName("highlight")
            .setIcon(AnswerIcon)
            .setPrevValue(question.highlighted)
            .setLabel("Destacar questão")
            .getAction(),
          actionBuilder
            .setName("delete")
            .setIcon(DeleteIcon)
            .setLabel("Deletar questão")
            .getAction(),
        ],
      };

      return actions[admin ? "admin" : "user"].map((action, index) => {
        return (
          <QuestionAction
            key={index}
            arial-label={action.label}
            action={action}
            questionUid={question.uid!}
          >
            {action.name === "like" && (
              <span>{Object.keys(question.likes ?? {}).length}</span>
            )}
            <action.icon />
          </QuestionAction>
        );
      });
    };

    // (do tommorrow) create an simple algorithm to get the most liked question in the page.

    // const handleGetMostLiked = () => {
    //   let mostLiked = 0;

    //   for (let index = 0; index < questions.length; index++) {
    //     if (index + 1 <= questions.length - 1) {
    //       const question = Object.keys(questions[index].likes ?? {}).length;
    //       const nextQuestion = Object.keys(
    //         questions[index + 1].likes ?? {}
    //       ).length;

    //       if (question > nextQuestion) {
    //         mostLiked = Object.keys(question).length;
    //       } else {
    //         mostLiked = Object.keys(nextQuestion).length;
    //       }
    //     }
    //   }

    //   console.log(mostLiked);
    // };

    const handleRenderQuestions = () => {
      let elements: JSX.Element[] = [];
      let lastElements = [];

      for (let index = questions.length - 1; index > 0; index--) {
        const question = questions[index];
        console.log(question);
        const element = (
          <QuestionElement
            key={question.uid}
            question={question}
            actions={handleRenderActions(question)}
          />
        );

        if (question.hidden) {
          lastElements.push(element);
        } else if (question.highlighted) {
          elements.unshift(element);
        } else {
          elements.push(element);
        }
      }

      return [elements, ...lastElements];
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
