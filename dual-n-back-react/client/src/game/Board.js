class Board {
  constructor(rows, columns) {
    this.rows = rows;
    this.columns = columns;
    this.history = [];
    this.score = 0;
  }

  start(onFlash) {
    this.onFlash = onFlash;
    this.timerToken = window.setInterval(() => onFlash(this.next()), 2500);
  }

  stop() {
    clearInterval(this.timerToken);
    delete this.onFlash;
    delete this.timerToken;
  }

  samePosition() {
    if (
      this.history.length > 1 &&
      (this.history[this.history.length - 1].position ==
        this.history[this.history.length - 2].position)
    ) {
      this.updateScore(100);
    } else {
      this.updateScore(-50);
    }
  }

  sameSound() {
    if (
      this.history.length > 1 &&
      (
        this.history[this.history.length - 1].sound ==
        this.history[this.history.length - 2].sound
      )
    ) {
      this.updateScore(100);
    } else {
      this.updateScore(-50);
    }
  }

  next() {
    const p = 15;
    const nextFlash = {};

    if (this.history.length > 0 && this.randomInRange(1, 100) <= p) {
      nextFlash.position = this.history[this.history.length - 1].position;
    } else {
      const randomRow = this.randomInRange(0, this.rows - 1);
      const randomColumn = this.randomInRange(0, this.columns - 1);
      nextFlash.position = [randomRow, randomColumn];
    }

    if (this.history.length > 0 && this.randomInRange(1, 100) <= p) {
      nextFlash.sound = this.history[this.history.length - 1].sound;
    } else {
      const randomSound = this.randomInRange(1, 9);
      nextFlash.sound = randomSound;
    }

    this.history.push(nextFlash);
    return nextFlash;
  }

  updateScore(delta) {
    const newScore = this.score + delta;
    if (this.onScoreChange) {
      this.onScoreChange(this.score, newScore);
    }
    this.score = newScore;
  }

  randomInRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
}

export default Board;
