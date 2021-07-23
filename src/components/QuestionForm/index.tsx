import { FormEvent } from "react";
import { createRef } from "react";
import { Question } from "../../entities/Question";
import { useUser } from "../../hooks/useUser";
import { useDatabase } from "../../hooks/useDatabase";
import { Button } from "../Button";
import { Profile } from "../Profile";

export const QuestionForm: React.FC<{ roomId: number }> = ({ roomId }) => {
  const { user, handleAuthSignIn } = useUser();
  const database = useDatabase();

  const questionField = createRef<HTMLTextAreaElement>();

  const handleAddNewQuestion = async (question: Question) => {
    const reference = database.ref(`/rooms/${roomId}`).child("questions");
    const key = reference.push().key;

    if (key) {
      question.uid = key;
      reference.child(key).set(question);
    }
  };

  const handleGetQuestionInput = () => {
    if (questionField.current && questionField.current.value) {
      return questionField.current?.value;
    } else {
      throw new Error("Pergunta não pode estar vazia");
    }
  };

  const handleMountQuestion = () => {
    if (user) {
      return new Question(handleGetQuestionInput(), user);
    } else {
      throw new Error("Usuário precisa estar logado");
    }
  };

  const handleSendQuestion = async (event: FormEvent) => {
    event.preventDefault();

    try {
      handleAddNewQuestion(handleMountQuestion());
      questionField.current!.value = "";
    } catch (err) {
      return err;
    }
  };

  return (
    <form className="question-form">
      <textarea ref={questionField} placeholder="O que você quer perguntar?" />
      <div>
        {user ? (
          <Profile user={user} />
        ) : (
          <span className="missing-login">
            Para enviar uma pergunta,{" "}
            <strong onClick={handleAuthSignIn}>Fazer login</strong>
          </span>
        )}
        <Button
          onClick={handleSendQuestion}
          disabled={user == null}
          type="submit"
        >
          Enviar pergunta
        </Button>
      </div>
    </form>
  );
};
