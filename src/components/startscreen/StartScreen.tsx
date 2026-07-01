import './styles.css';

interface StartScreenProps {
  startGame: () => void;
}

function StartScreen({ startGame }: StartScreenProps) {
  return (
    <section className="start">
      <h1>Secret Word</h1>

      <p>Clique no botão abaixo para começar a jogar</p>
      <button onClick={startGame}>Começar o jogo</button>
    </section>
  );
}

export default StartScreen;
