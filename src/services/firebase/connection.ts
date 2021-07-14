import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
import { config } from "./config";

type Config = typeof config;

interface IServices {
  [serviceName: string]: any;
  auth?: firebase.auth.Auth;
  database?: firebase.database.Database;
}

class FirebaseConnection {
  public services: IServices = {};
  public isInitialized: boolean = false;

  initializeApp = (config: Config) => {
    firebase.initializeApp(config);
    this.initializeServices();
    this.isInitialized = true;
  };

  private initializeServices = () => {
    const auth = firebase.auth();
    const database = firebase.database();

    this.services = { auth, database };
  };
}

const firebaseConnection = new FirebaseConnection();

export { firebaseConnection };
