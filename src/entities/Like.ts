export class Like {
  timestamp: number;

  constructor() {
    const time = new Date().getTime();
    this.timestamp = time;
  }
}
