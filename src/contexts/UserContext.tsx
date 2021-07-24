import { useEffect, useState } from "react";
import { createContext } from "react";
import { User } from "../entities/User";
import { firebaseConnection } from "../services/firebase/connection";
import firebase from "firebase/app";

type ContextType = {
  user?: User;
  handleAuthSignIn: () => Promise<void>;
  handleAuthSignOut: () => Promise<void>;
};

export const UserContext = createContext({} as ContextType);

export const UserContextProvider: React.FC = ({ children }) => {
  let [user, setUser] = useState<User>();

  useEffect(() => {
    if (firebaseConnection.isInitialized) {
      const unsubscribe = firebaseConnection.services.auth!.onAuthStateChanged(
        (user) => {
          if (user) return setUser(handleUserInformations(user));
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
        setUser(handleUserInformations(user));
      }
    }
  };

  const handleAuthSignOut = async () => {
    if (firebaseConnection.isInitialized) {
      await firebaseConnection.services.auth!.signOut();
      setUser(undefined);
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
    <UserContext.Provider value={{ user, handleAuthSignIn, handleAuthSignOut }}>
      {children}
    </UserContext.Provider>
  );
};
