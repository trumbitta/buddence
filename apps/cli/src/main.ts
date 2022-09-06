import { Fighter, Match } from '@buddence/foo';

const trinita: Fighter = {
  name: 'Trinita',
  healthPoints: 70,
  hitStrength: 5,
};

const bambino: Fighter = {
  name: 'Bambino',
  healthPoints: 30,
  hitStrength: 10,
};

const match = new Match(trinita, bambino);
match.start();

const intervalId = setInterval(() => {
  const { fighter1, fighter2, winner } = match.getStatus();

  console.log(`${fighter1.name}: ${fighter1.healthPoints}`);
  console.log(`${fighter2.name}: ${fighter2.healthPoints}`);

  if (winner) {
    clearInterval(intervalId);

    console.log(`✨ ${winner.name} WINS! ✨`);
    console.log(`ℹ️  ${winner.healthPoints} remaining health points.`);
  }
}, 500);
