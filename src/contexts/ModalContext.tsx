import { useEffect } from "react";
import { createContext, useState } from "react";
import { Modal } from "../entities/Modal";

type ContextProps = {
  modal?: Modal;
  setModal: React.Dispatch<React.SetStateAction<Modal | undefined>>;
};

export const ModalContext = createContext({} as ContextProps);

export const ModalContextProvider: React.FC = ({ children }) => {
  const [modal, setModal] = useState<Modal>();

  useEffect(() => setModal(undefined), []);

  return (
    <ModalContext.Provider value={{ modal, setModal }}>
      {children}
    </ModalContext.Provider>
  );
};
