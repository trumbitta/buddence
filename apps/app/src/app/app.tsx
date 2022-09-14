import { Fighter, FighterData, Match } from '@buddence/foo';
import { useRef, useState } from 'react';

export const App = () => {
  const initialTeam1: FighterData[] = [
    {
      name: 'Trinita',
      healthPoints: 40,
      hitStrength: 5,
      hitFrequencyMs: 1000,
    },

    {
      name: 'Bambino',
      healthPoints: 50,
      hitStrength: 9,
      hitFrequencyMs: 4000,
    },
  ];

  const initialTeam2: FighterData[] = [
    {
      name: 'Gokou',
      healthPoints: 50,
      hitStrength: 8,
      hitFrequencyMs: 500,
    },

    {
      name: 'Vegeta',
      healthPoints: 40,
      hitStrength: 7,
      hitFrequencyMs: 800,
    },
  ];

  const intervalId = useRef<number>();

  const [matchStatus, setMatchStatus] = useState<{
    team1: Fighter[];
    team2: Fighter[];
    winner: Fighter[] | undefined;
  }>({ team1: [], team2: [], winner: undefined });

  const match = new Match(initialTeam1, initialTeam2);
  match.start();

  intervalId.current = window.setInterval(() => {
    const { team1, team2, winner } = match.getStatus();

    if (winner) {
      match.stop();
      clearInterval(intervalId.current);
    }

    setMatchStatus({ team1, team2, winner });
  }, 60);

  return (
    <>
      <div>
        {matchStatus.team1.map(({ name, healthPoints }) => (
          <p>
            {name} - {healthPoints}
          </p>
        ))}
      </div>

      <div>
        {matchStatus.team2.map(({ name, healthPoints }) => (
          <p>
            {name} - {healthPoints}
          </p>
        ))}
      </div>

      {matchStatus.winner
        ? matchStatus.winner.map(({ name, healthPoints }) => (
            <p>
              Winner: {name} - {healthPoints}
            </p>
          ))
        : null}
    </>
  );
};
