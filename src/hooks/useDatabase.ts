import { firebaseConnection } from "../services/firebase/connection";

export const useDatabase = () => {
  if (firebaseConnection.isInitialized) {
    return firebaseConnection.services.database!;
  }

  throw new Error("Services is not initialized");
};
