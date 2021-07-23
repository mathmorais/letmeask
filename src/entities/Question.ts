import { Like } from "./Like";
import { User } from "./User";

export class Question {
  uid: string | undefined;
  content: string;
  user: User;
  likes: { [key: string]: Like } = {};
  highlighted: boolean = false;
  hidden: boolean = false;

  constructor(content: string, user: User, uid?: string) {
    this.uid = uid;
    this.content = content;
    this.user = user;
  }
}
