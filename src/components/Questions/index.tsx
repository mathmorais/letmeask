import emptyQuestionsImg from "../../assets/images/empty-questions.svg";
import { Question } from "../../entities/Question";
import { QuestionElement } from "../QuestionElement";
import "./styles.scss";

export const Questions: React.FC<{
  questions: Question[];
}> = ({ questions }) => {
  const handleRenderQuestions = () => {
    return questions
      .map((question, index) => (
        <QuestionElement key={index} question={question} />
      ))
      .reverse();
  };

  if (questions.length > 0) {
    return (
      <section id="questions-container">{handleRenderQuestions()}</section>
    );
  }

  return (
    <div className="questions-fallback">
      <img src={emptyQuestionsImg} alt="Nenhuma pergunta encontrada" />
      <h4>Nenhuma pergunta por aqui...</h4>
      <p>Faça o seu login e seja a primeira pessoa a fazer uma pergunta!</p>
    </div>
  );
};
