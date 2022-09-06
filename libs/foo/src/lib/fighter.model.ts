import { IntervalTimer } from './interval-timer.type';

export interface FighterData {
  name: string;
  healthPoints: number;
  hitStrength: number;
  hitFrequencyMs: number;
}

export class Fighter {
  name: string;
  healthPoints: number;
  hitStrength: number;
  hitFrequencyMs: number;
  isIncapacitated = false;

  private fightingLoopTimerId?: IntervalTimer;

  constructor({
    healthPoints,
    hitFrequencyMs,
    hitStrength,
    name,
  }: FighterData) {
    this.healthPoints = healthPoints;
    this.hitFrequencyMs = hitFrequencyMs;
    this.hitStrength = hitStrength;
    this.name = name;
  }

  startFighting(opponent: Fighter) {
    this.fightingLoopTimerId = setInterval(() => {
      this.receiveHitFrom(opponent);

      if (this.healthPoints === 0) {
        this.isIncapacitated = true;
        this.stopFighting();
      }
    }, opponent.hitFrequencyMs);
  }

  stopFighting() {
    if (this.fightingLoopTimerId) {
      console.log(this.name, 'stopping', this.isIncapacitated);
      clearInterval(this.fightingLoopTimerId);
      this.fightingLoopTimerId = undefined;
    }
  }

  private receiveHitFrom(opponent: Fighter) {
    const healthPointsAfterHit = this.healthPoints - opponent.hitStrength;

    this.healthPoints = healthPointsAfterHit < 0 ? 0 : healthPointsAfterHit;
  }
}
