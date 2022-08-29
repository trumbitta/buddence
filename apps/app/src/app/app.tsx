import { Fighter } from '@buddence/foo';
import { useEffect, useRef, useState } from 'react';

export const App = () => {
  const tickMs = 1000;

  const trinitaInitial: Fighter = {
    name: 'Trinita',
    healthPoints: 100,
    hitStrength: 5,
  };

  const bambinoInitial: Fighter = {
    name: 'Bambino',
    healthPoints: 20,
    hitStrength: 8,
  };

  const [trinitaHp, setTrinitaHp] = useState(trinitaInitial.healthPoints);
  const [bambinoHp, setBambinoHp] = useState(bambinoInitial.healthPoints);
  const [isFighting, setIsFighting] = useState(false);
  const [winner, setWinner] = useState<string>();
  const trinitaFightingTimer = useRef<NodeJS.Timer>();
  const bambinoFightingTimer = useRef<NodeJS.Timer>();

  useEffect(() => {
    console.log(trinitaHp, bambinoHp);

    if (trinitaHp <= 0) {
      clearInterval(trinitaFightingTimer.current as NodeJS.Timer);
      clearInterval(bambinoFightingTimer.current as NodeJS.Timer);

      setIsFighting(false);
      setWinner('Bambino');
    }

    if (bambinoHp <= 0) {
      clearInterval(trinitaFightingTimer.current as NodeJS.Timer);
      clearInterval(bambinoFightingTimer.current as NodeJS.Timer);

      setIsFighting(false);
      setWinner('Trinita');
    }
  }, [bambinoHp, trinitaHp]);

  useEffect(() => {
    if (isFighting) {
      if (trinitaHp > 0 && bambinoHp > 0) {
        trinitaFightingTimer.current = setInterval(() => {
          const newHpValue = bambinoHp - trinitaInitial.hitStrength;

          setBambinoHp(newHpValue);
        }, tickMs);
      }

      if (trinitaHp > 0 && bambinoHp > 0) {
        bambinoFightingTimer.current = setInterval(() => {
          const newHpValue = trinitaHp - bambinoInitial.hitStrength;

          setTrinitaHp(newHpValue);
        }, tickMs);
      }
    }

    return () => {
      clearInterval(trinitaFightingTimer.current as NodeJS.Timer);
      clearInterval(bambinoFightingTimer.current as NodeJS.Timer);
    };
  }, [
    bambinoHp,
    bambinoInitial.hitStrength,
    isFighting,
    trinitaHp,
    trinitaInitial.hitStrength,
  ]);

  return (
    <>
      <h1>{!isFighting && winner ? `Winner: ${winner}` : 'Foo'}</h1>

      <p>T: {trinitaHp}</p>
      <p>B: {bambinoHp}</p>
      <button
        onClick={() => setIsFighting(!isFighting)}
        disabled={winner !== undefined}
      >
        {isFighting ? 'Stop' : 'Fight!'}
      </button>
    </>
  );
};
