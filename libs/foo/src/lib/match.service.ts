import { Fighter, FighterData } from './fighter.model';
import { IntervalTimer } from './interval-timer.type';

export class Match {
  private matchTimerId?: IntervalTimer;
  private team1: Fighter[];
  private team2: Fighter[];
  private winner?: Fighter[];

  constructor(team1: FighterData[], team2: FighterData[]) {
    this.team1 = team1.map((fighterData) => new Fighter(fighterData));
    this.team2 = team2.map((fighterData) => new Fighter(fighterData));
  }

  start() {
    this.matchTimerId = setInterval(() => {
      if (this.checkWinner()) {
        this.stop();
      }
    }, 2000);

    this.startFighting();
  }

  stop() {
    this.stopFighting();

    clearInterval(this.matchTimerId);
  }

  getStatus() {
    return {
      team1: this.team1,
      team2: this.team2,
      winner: this.winner,
    };
  }

  private stopFighting() {
    this.team1.forEach((fighter) => fighter.stopFighting());
    this.team2.forEach((fighter) => fighter.stopFighting());
  }

  private startFighting() {
    this.team1.forEach((fighter, index) => {
      fighter.startFighting(this.team2[index]);
    });

    this.team2.forEach((fighter, index) => {
      fighter.startFighting(this.team1[index]);
    });
  }

  private checkWinner(): boolean {
    // Well, no one is incapacitated yet.
    if (
      [...this.team1, ...this.team2].findIndex(
        ({ isIncapacitated }) => isIncapacitated
      ) === -1
    ) {
      return false;
    }

    if (
      this.team1.filter(({ isIncapacitated }) => !isIncapacitated).length === 0
    ) {
      this.winner = this.team2;

      return true;
    }

    if (
      this.team2.filter(({ isIncapacitated }) => !isIncapacitated).length === 0
    ) {
      this.winner = this.team1;

      return true;
    }

    return false;
  }
}
