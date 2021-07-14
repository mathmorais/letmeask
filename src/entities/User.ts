export class User {
  displayName: string;
  photoURL: string;
  uid: string;

  constructor(displayName: string, photoURL: string, uid: string) {
    this.displayName = displayName;
    this.photoURL = photoURL;
    this.uid = uid;
  }
}
