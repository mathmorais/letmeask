import { Like } from "./Like";
import { User } from "./User";

export class Question {
  content: string;
  user: User;
  likes: { [key: string]: Like } = {};
  isHighlighted: boolean = false;
  isHidden: boolean = false;

  constructor(content: string, user: User) {
    this.content = content;
    this.user = user;
  }
}
