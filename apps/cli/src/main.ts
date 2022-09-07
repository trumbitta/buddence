import { FighterData, Match } from '@buddence/foo';

const trinita: FighterData = {
  name: 'Trinita',
  healthPoints: 40,
  hitStrength: 5,
  hitFrequencyMs: 1000,
};

const bambino: FighterData = {
  name: 'Bambino',
  healthPoints: 50,
  hitStrength: 9,
  hitFrequencyMs: 4000,
};

const gokou: FighterData = {
  name: 'Gokou',
  healthPoints: 50,
  hitStrength: 8,
  hitFrequencyMs: 500,
};

const vegeta: FighterData = {
  name: 'Vegeta',
  healthPoints: 40,
  hitStrength: 7,
  hitFrequencyMs: 800,
};

const match = new Match([trinita, bambino], [vegeta, gokou]);
match.start();

const intervalId = setInterval(() => {
  const { team1, team2, winner } = match.getStatus();

  console.clear();
  team1.forEach((fighter) =>
    console.log(`${fighter.name}: ${fighter.healthPoints}`)
  );
  team2.forEach((fighter) =>
    console.log(`${fighter.name}: ${fighter.healthPoints}`)
  );

  if (winner) {
    match.stop();
    clearInterval(intervalId);

    winner.forEach((fighter) => {
      console.log(`✨ ${fighter.name} WINS! ✨`);
      console.log(`ℹ️  ${fighter.healthPoints} remaining health points.`);
    });
  }
}, 60);
