import { QuestionElement } from "../QuestionElement";
import "./styles.scss";

import {
  CheckSvg,
  AnswerSvg,
  DeleteSvg,
  LikeSvg,
  EmptyQuestionSvg,
} from "../../constants/vectors";

import { QuestionAction } from "../QuestionAction";
import { ActionBuilder } from "../../entities/Action";
import { useLikedCookies } from "../../hooks/useLikedCookies";
import { animated, useTransition } from "react-spring";
import { Question } from "../../entities/Question";

interface IQuestionProps {
  questions: Question[];
  admin?: boolean;
}

export const Questions = ({ admin = false, questions }: IQuestionProps) => {
  const actionBuilder = new ActionBuilder();
  const { handleFindLikedQuestion } = useLikedCookies();

  const handleRenderActions = (question: Question) => {
    const actions = {
      user: [
        actionBuilder
          .setName("like")
          .setIcon(LikeSvg)
          .setLabel("Gostei")
          .setPrevValue(handleFindLikedQuestion(question.uid!))
          .getAction(),
      ],
      admin: [
        actionBuilder
          .setName("hide")
          .setIcon(CheckSvg)
          .setLabel("Esconder")
          .setPrevValue(question.hidden)
          .getAction(),
        actionBuilder
          .setName("highlight")
          .setIcon(AnswerSvg)
          .setPrevValue(question.highlighted)
          .setLabel("Destacar")
          .getAction(),
        actionBuilder
          .setName("delete")
          .setIcon(DeleteSvg)
          .setLabel("Deletar")
          .getAction(),
      ],
    };

    return actions[admin ? "admin" : "user"].map((action, index) => {
      if (question.hidden && action.name === "like") return undefined;

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

  const handleSortQuestionPerLikes = (questions: Question[]) => {
    return questions.sort(
      (question, nextQuestion) =>
        Object.keys(question.likes ?? {}).length -
        Object.keys(nextQuestion.likes ?? {}).length
    );
  };

  const handleSerializeQuestions = (questions: Question[]): Question[] => {
    let elements: Question[] = [];
    let lastElements: Question[] = [];

    for (let index = questions.length - 1; index >= 0; index--) {
      const question = handleSortQuestionPerLikes(questions)[index];

      if (question.hidden) {
        lastElements.push(question);
      } else if (question.highlighted) {
        elements.unshift(question);
      } else {
        elements.push(question);
      }
    }

    return [...elements, ...lastElements];
  };

  let delay = 0;
  let totalHeight = 0;
  const transition = useTransition(
    handleSerializeQuestions(questions).map((question) => {
      const charSizePerPixel = 0.24;
      const questionDefaultSize = 121.3;
      const questionHeight =
        questionDefaultSize + question.content.length * charSizePerPixel;

      return {
        ...question,
        y: (totalHeight += questionHeight) - questionHeight,
      };
    }),
    {
      key: (item: Question) => item.uid,
      from: { height: 8, x: -150, opacity: 0 },
      leave: { x: 150, opacity: 0 },
      enter:
        ({ y }) =>
        (next) => {
          delay += 200;
          return next({ y, x: 0, opacity: 1, delay: delay });
        },
      update: (item) => ({
        y: item.y,
      }),
    }
  );

  if (questions.length > 0) {
    return (
      <section
        style={{ minHeight: totalHeight + 100 }}
        id="questions-container"
      >
        {transition((style, item) =>
          item ? (
            <animated.div style={style}>
              <QuestionElement
                key={item.uid}
                question={item}
                actions={handleRenderActions(item)}
              />
            </animated.div>
          ) : (
            <></>
          )
        )}
      </section>
    );
  } else {
    return (
      <div className="questions-fallback">
        <EmptyQuestionSvg />
        <h4>Nenhuma pergunta por aqui...</h4>
        <p>Faça o seu login e seja a primeira pessoa a fazer uma pergunta!</p>
      </div>
    );
  }
};
