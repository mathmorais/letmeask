import { useDatabase } from "../hooks/useDatabase";
import firebase from "firebase/app";
import { useGetRoomUid } from "./useGetRoomUid";
import { Like } from "../entities/Like";
import { useUser } from "./useUser";
import { Modal } from "../entities/Modal";
import { useContext } from "react";
import { ModalContext } from "../contexts/ModalContext";
import Cookies from "js-cookie";

import { useLikedCookies } from "./useLikedCookies";
import { DeleteSvg } from "../constants/vectors";

export const useQuestionActions = (questionUid: string) => {
  const database = useDatabase();
  const roomId = useGetRoomUid();
  const { user } = useUser();
  const { setModal } = useContext(ModalContext);
  const { likedItems, handleFindLikedQuestion } = useLikedCookies();

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

  const handleDeleteQuestion = (questionRef: firebase.database.Reference) => {
    const modal = new Modal({
      icon: DeleteSvg,
      title: "Excluir pergunta",
      description: "Tem certeza que você deseja excluir esta pergunta?",
      onAccept: () => {
        setModal(undefined);
        questionRef.remove();
      },
    });

    setModal(modal);
  };

  const handleUnLikeQuestion = (questionRef: firebase.database.Reference) => {
    if (user) {
      questionRef.child(`likes/${user.uid}`).remove();
      Cookies.set(
        "liked",
        likedItems.filter((item) => item !== questionRef.key)
      );
    }
  };

  const handleLikeQuestion = (questionRef: firebase.database.Reference) => {
    if (handleFindLikedQuestion(questionRef.key!)) {
      return handleUnLikeQuestion(questionRef);
    }

    if (user) {
      Cookies.set("liked", [...likedItems, questionRef.key!]);
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
