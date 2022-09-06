import { Fighter, Match } from '@buddence/foo';

const trinita: Fighter = {
  name: 'Trinita',
  healthPoints: 20,
  hitStrength: 5,
  hitFrequencyMs: 2000,
};

const bambino: Fighter = {
  name: 'Bambino',
  healthPoints: 30,
  hitStrength: 8,
  hitFrequencyMs: 4000,
};

const match = new Match(trinita, bambino);
match.start();

const intervalId = setInterval(() => {
  const { fighter1, fighter2, winner } = match.getStatus();

  console.clear();
  console.log(`${fighter1.name}: ${fighter1.healthPoints}`);
  console.log(`${fighter2.name}: ${fighter2.healthPoints}`);

  if (winner) {
    clearInterval(intervalId);

    console.log(`✨ ${winner.name} WINS! ✨`);
    console.log(`ℹ️  ${winner.healthPoints} remaining health points.`);
  }
}, 20);
