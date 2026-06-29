import "./App.css";
import { useCallback, useEffect, useState } from "react";

import { wordList } from "./mocks/words";

import StartScreen from "./components/startscreen/StartScreen";
import Game from "./components/game/Game";
import GameOver from "./components/gameover/GameOver";

const stages = [
  { id: 1, name: "start" },
  { id: 2, name: "game" },
  { id: 3, name: "end" },
];

function App() {
  const [gameStage, setGameStage] = useState(stages[0].name);
  const [words] = useState(wordList);

  const startGame = () => {
    setGameStage(stages[1].name);
  };
  return (
    <div className="app-container">
      {gameStage == "start" && <StartScreen startGame={startGame}/>}
      {gameStage == "game" && <Game />}
      {gameStage == "end" && <GameOver />}
    </div>
  );
}

export default App;
