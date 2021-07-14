import { Question } from "./Question";
import { User } from "./User";

export class Room {
  uid: number;
  authorId: string;
  title: string;
  questions?: { [key: string]: Question } = {};

  constructor(title: string, user: User) {
    this.uid = this.generateId();
    this.title = title;
    this.authorId = user.uid;
  }

  private generateId(): number {
    return Number(
      Math.floor(Math.random() * Date.now())
        .toString()
        .slice(0, 6)
    );
  }
}
