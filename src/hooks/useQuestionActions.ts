import { useDatabase } from "../hooks/useDatabase";
import firebase from "firebase/app";
import { useGetRoomUid } from "./useGetRoomUid";

type Actions = "highlight" | "hide" | "delete";

export const useQuestionActions = () => {
  const database = useDatabase();
  const roomId = useGetRoomUid();

  const handleGetQuestionRef = (uid: string) => {
    return database.ref(`/rooms/${roomId}/questions`).child(uid);
  };

  const handleHighlightQuestion = (
    questionRef: firebase.database.Reference,
    prevValue?: boolean
  ) => questionRef.child("isHighlighted").set(!prevValue);

  const handleHideQuestion = (
    questionRef: firebase.database.Reference,
    prevValue?: boolean
  ) => questionRef.child("isHidden").set(!prevValue);

  const handleDeleteQuestion = async (
    questionRef: firebase.database.Reference
  ) => questionRef.remove();

  const actions = {
    highlight: handleHighlightQuestion,
    hide: handleHideQuestion,
    delete: handleDeleteQuestion,
  };

  const handleQuestionAction = async (
    uid: string,
    action: Actions,
    currentValue?: boolean
  ) => {
    return await actions[action](handleGetQuestionRef(uid), currentValue);
  };

  return { handleQuestionAction };
};
