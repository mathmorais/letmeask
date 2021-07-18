import { Like } from "./Like";
import { User } from "./User";

export class Question {
  uid: string | undefined;
  content: string;
  user: User;
  likes: { [key: string]: Like } = {};
  isHighlighted: boolean = false;
  isHidden: boolean = false;

  constructor(content: string, user: User, uid?: string) {
    this.uid = uid;
    this.content = content;
    this.user = user;
  }
}
