import { Fighter } from './fighter.model';

export class Match {
  isInProgress = false;
  winner?: Fighter;

  private fighter1: Fighter;
  private fighter2: Fighter;

  private matchLoopId?: ReturnType<typeof setInterval>;

  constructor(fighter1: Fighter, fighter2: Fighter) {
    this.fighter1 = fighter1;
    this.fighter2 = fighter2;
  }

  start() {
    this.isInProgress = true;

    this.matchLoopId = this.startMatchLoop();
  }

  stop() {
    this.isInProgress = false;

    clearInterval(this.matchLoopId);
  }

  getStatus() {
    return {
      fighter1: this.fighter1,
      fighter2: this.fighter2,
      winner: this.winner,
    };
  }

  private startMatchLoop(): ReturnType<typeof setInterval> {
    return setInterval(() => {
      this.fighter1 = this.registerHit(this.fighter1, this.fighter2);
      this.fighter2 = this.registerHit(this.fighter2, this.fighter1);

      if (this.checkWinner()) {
        this.stop();
      }
    }, 1000);
  }

  private registerHit(fighter: Fighter, gotHitFrom: Fighter): Fighter {
    const healthPointsAfterHit = fighter.healthPoints - gotHitFrom.hitStrength;
    const healthPoints = healthPointsAfterHit < 0 ? 0 : healthPointsAfterHit;

    return {
      ...fighter,
      healthPoints,
    };
  }

  private checkWinner(): boolean {
    const fighters = [this.fighter1, this.fighter2];

    if (fighters.findIndex(({ healthPoints }) => healthPoints === 0) === -1) {
      return false;
    }

    const possibleWinner = fighters.filter(
      ({ healthPoints }) => healthPoints > 0
    );

    if (possibleWinner.length > 1) {
      return false;
    } else {
      this.winner = possibleWinner[0];

      return true;
    }
  }
}
