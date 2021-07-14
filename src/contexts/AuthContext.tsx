import { useEffect, useState } from "react";
import { createContext } from "react";
import { User } from "../entities/User";
import { firebaseConnection } from "../services/firebase/connection";
import firebase from "firebase/app";

type ContextType = {
  user?: User;
  handleAuthSignIn: () => Promise<void>;
};

export const AuthContext = createContext({} as ContextType);

export const AuthContextProvider: React.FC = ({ children }) => {
  let [userState, setUserState] = useState<User>();

  useEffect(() => {
    if (firebaseConnection.isInitialized) {
      const unsubscribe = firebaseConnection.services.auth!.onAuthStateChanged(
        (user) => {
          if (user) return setUserState(handleUserInformations(user));
        }
      );

      return () => {
        unsubscribe();
      };
    }
  }, []);

  const handleAuthSignIn = async () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    if (firebaseConnection.isInitialized) {
      const { user } = await firebaseConnection.services.auth!.signInWithPopup(
        provider
      );

      if (user) {
        setUserState(handleUserInformations(user));
      }
    }
  };

  const handleUserInformations = (user: firebase.User) => {
    const { displayName, photoURL, uid } = user;

    if (!displayName || !photoURL) {
      throw new Error("Missing important user informations");
    }

    return new User(displayName, photoURL, uid);
  };

  return (
    <AuthContext.Provider
      value={{ handleAuthSignIn: handleAuthSignIn, user: userState }}
    >
      {children}
    </AuthContext.Provider>
  );
};
