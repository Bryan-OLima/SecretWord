import './App.css';
import { useEffect, useState } from 'react';

import { wordList } from './mocks/words';

import StartScreen from './components/startscreen/StartScreen';
import Game from './components/game/Game';
import GameOver from './components/gameover/GameOver';

const stages = [
  { id: 1, name: 'start' },
  { id: 2, name: 'game' },
  { id: 3, name: 'end' },
];

const guessesQty: number = 3;

function App() {
  const [gameStage, setGameStage] = useState<string>(stages[0].name);
  const [words] = useState<any>(wordList);

  const [pickedWord, setPickedWord] = useState<string>('');
  const [pickedCategory, setPickedCategory] = useState<string>('');
  const [letters, setLetters] = useState<string[]>([]);

  const [guessedLetters, setGuessedLetters] = useState<string[]>([]);
  const [wrongLetters, setWrongLetter] = useState<string[]>([]);
  const [guesses, setGuesses] = useState<number>(guessesQty);
  const [score, setScore] = useState<number>(0);
  const [bonusScore, setBonusScore] = useState<number>(0);

  const gamePicker = (): {
    word: string;
    category: string;
    splitedWord: string[];
  } => {
    const categories = Object.keys(words);
    const category = categories[Math.floor(Math.random() * categories.length)];

    const word =
      words[category][Math.floor(Math.random() * words[category].length)];

    const splitedWord = word.split('');

    return { word, category, splitedWord };
  };

  const startGame = () => {
    const { word, category, splitedWord } = gamePicker();

    const split = splitedWord.map((letter) => letter.toUpperCase());

    setPickedCategory(category);
    setPickedWord(word);
    setLetters(split);
    setGameStage(stages[1].name);
  };

  const verifyLetter = (letter: string) => {
    const normalizedLetter = letter.toUpperCase();

    if (
      guessedLetters.includes(normalizedLetter) ||
      wrongLetters.includes(normalizedLetter)
    ) {
      return;
    }

    if (letters.includes(normalizedLetter)) {
      setGuessedLetters((gl) => [...gl, normalizedLetter]);
    } else {
      setWrongLetter((wl) => [...wl, normalizedLetter]);
      setGuesses((g) => g - 1);
    }
  };

  const restartGame = () => {
    setScore(0);
    setGuesses(guessesQty);
    setGameStage(stages[0].name);
  };

  const clearLetterStates = () => {
    setWrongLetter([]);
    setGuessedLetters([]);
  };

  //loose condition
  useEffect(() => {
    if (guesses <= 0) {
      clearLetterStates();
      setGameStage(stages[2].name);
    }
  }, [guesses]);

  //win condition
  useEffect(() => {
    const uniqueLetters: string[] = [...new Set(letters)];

    if (uniqueLetters.length === guessedLetters.length) {
      setBonusScore((b) => b + 10);
      setScore((s) => (s += 100 + bonusScore));
      clearLetterStates();
      startGame();
    }
  }, [guessedLetters]);

  return (
    <div className="app-container">
      {gameStage == 'start' && <StartScreen startGame={startGame} />}
      {gameStage == 'game' && (
        <Game
          verifyLetter={verifyLetter}
          pickedCategory={pickedCategory}
          letters={letters}
          guessedLetters={guessedLetters}
          wrongLetters={wrongLetters}
          guesses={guesses}
          score={score}
        />
      )}
      {gameStage == 'end' && (
        <GameOver
          restartGame={restartGame}
          score={score}
          pickedWord={pickedWord}
        />
      )}
    </div>
  );
}

export default App;
