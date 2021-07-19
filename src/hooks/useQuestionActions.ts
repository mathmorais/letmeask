import { useDatabase } from "../hooks/useDatabase";
import firebase from "firebase/app";
import { useGetRoomUid } from "./useGetRoomUid";

export const useQuestionActions = (questionUid: string) => {
  const database = useDatabase();
  const roomId = useGetRoomUid();

  const handleGetQuestionRef = () => {
    return database.ref(`/rooms/${roomId}/questions`).child(questionUid);
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
  } as { [actionName: string]: Function };

  // const handleResetActions = async (
  //   questionRef: firebase.database.Reference
  // ) => {
  //   await questionRef.child("isHighlighted").set(false);
  //   await questionRef.child("isHidden").set(false);
  // };

  const handleQuestionAction = async (action: string, prevValue?: boolean) => {
    const ref = handleGetQuestionRef();

    return actions[action](ref, prevValue);
  };

  return { handleQuestionAction };
};
