import './styles.css';

interface GamerOverProps {
  restartGame: () => void;
  score: number;
  pickedWord: string;
}

function GameOver({ restartGame, score, pickedWord }: GamerOverProps) {
  return (
    <div>
      <h1>Fim de Jogo!</h1>
      <p>
        A palavra era: <span>{pickedWord.toUpperCase()}</span>
      </p>
      <h2>
        A sua ponutação foi: <span>{score}</span>
      </h2>
      <button onClick={restartGame}>Tentar Novamente</button>
    </div>
  );
}

export default GameOver;
