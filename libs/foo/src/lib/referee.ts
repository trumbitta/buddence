import { Fighter } from './fighter.model';

export const processHit = (fighter: Fighter, gotHitFrom: Fighter): Fighter => {
  const healthPointsAfterHit = fighter.healthPoints - gotHitFrom.hitStrength;
  const healthPoints = healthPointsAfterHit < 0 ? 0 : healthPointsAfterHit;

  return {
    ...fighter,
    healthPoints,
  };
};
