import { useDatabase } from "../hooks/useDatabase";
import firebase from "firebase/app";
import { useGetRoomUid } from "./useGetRoomUid";
import { Like } from "../entities/Like";
import { useAuthContext } from "./useAuthContext";

export const useQuestionActions = (questionUid: string) => {
  const database = useDatabase();
  const roomId = useGetRoomUid();
  const { user } = useAuthContext();

  const handleGetQuestionRef = () => {
    return database.ref(`/rooms/${roomId}/questions`).child(questionUid);
  };

  const handleHighlightQuestion = async (
    questionRef: firebase.database.Reference,
    prevValue?: boolean
  ) => {
    await questionRef.child("hidden").set(false);
    await questionRef.child("highlighted").set(!prevValue);
  };

  const handleHideQuestion = async (
    questionRef: firebase.database.Reference,
    prevValue?: boolean
  ) => {
    await questionRef.child("highlighted").set(false);
    questionRef.child("hidden").set(!prevValue);
  };

  const handleDeleteQuestion = (questionRef: firebase.database.Reference) =>
    questionRef.remove();

  const handleLikeQuestion = (questionRef: firebase.database.Reference) => {
    if (user) {
      questionRef.child(`likes/${user.uid}`).set(new Like());
    } else {
      alert("Usuário precisa estar logado");
    }
  };

  const actions = {
    highlight: handleHighlightQuestion,
    hide: handleHideQuestion,
    delete: handleDeleteQuestion,
    like: handleLikeQuestion,
  } as { [actionName: string]: Function };

  const handleQuestionAction = async (
    action: keyof typeof actions,
    prevValue?: boolean
  ) => {
    const ref = handleGetQuestionRef();

    await actions[action](ref, prevValue);
  };

  return { handleQuestionAction };
};
