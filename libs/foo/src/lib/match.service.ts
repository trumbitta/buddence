import { Fighter } from './fighter.model';
import { IntervalTimer } from './interval-timer.type';

export class Match {
  private fighter1: Fighter;
  private fighter2: Fighter;
  private matchTimerId?: IntervalTimer;
  private winner?: Fighter;

  constructor(fighter1: Fighter, fighter2: Fighter) {
    this.fighter1 = fighter1;
    this.fighter2 = fighter2;
  }

  start() {
    this.matchTimerId = setInterval(() => {
      if (this.checkWinner()) {
        this.stop();
      }
    }, 1);

    this.fighter1.startFighting(this.fighter2);
    this.fighter2.startFighting(this.fighter1);
  }

  stop() {
    this.fighter1.stopFighting();
    this.fighter2.stopFighting();

    clearInterval(this.matchTimerId);
  }

  getStatus() {
    return {
      fighter1: this.fighter1,
      fighter2: this.fighter2,
      winner: this.winner,
    };
  }

  private checkWinner(): boolean {
    const fighters = [{ ...this.fighter1 }, { ...this.fighter2 }];
    // console.log(fighters);

    if (fighters.findIndex(({ isIncapacitated }) => isIncapacitated) === -1) {
      console.log('nah 1');
      return false;
    }

    const possibleWinner = fighters.filter(
      ({ isIncapacitated }) => !isIncapacitated
    );

    if (possibleWinner.length > 1) {
      console.log('nah 2');
      return false;
    } else {
      this.winner = possibleWinner[0] as Fighter;

      console.log('yessah', this.winner, possibleWinner[0]);

      return true;
    }
  }
}
