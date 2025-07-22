// CSS.
import "./App.css";

// REACT.
import { useCallback, useEffect, useState } from "react";

// DATA.
import { wordsList } from "./data/words";

// COMPONENTS.
import StartScreen from "./components/StartScreen";
import Game from "./components/Game";
import GameOver from "./components/GameOver";

const stages = [
  { id: 1, name: "start" },
  { id: 2, name: "game" },
  { id: 3, name: "end" },
];

const guessesQty = 5;

function App() {
  const [gameStage, setGameStage] = useState(stages[0].name);
  const [words] = useState(wordsList);

  const [pickedWord, setPickedWord] = useState("");
  const [pickedCategory, setPickedCategory] = useState("");
  const [letters, setLetters] = useState([]);

  const [guessedLetters, setGuessedLetters] = useState([]);
  const [wrongLetters, setWrongLetters] = useState([]);
  const [guesses, setGuesses] = useState(guessesQty);
  const [score, setScore] = useState(0);

  const [showWinMessage, setShowWinMessage] = useState(false);

  // CLEAR ALL LETTER STATES.
  const clearLettersStates = useCallback(() => {
    setGuessedLetters([]);
    setWrongLetters([]);
  }, []);

  // PICK RANDOM WORD AND CATEGORY.
  const pickWordAndCategory = useCallback(() => {
    const categories = Object.keys(words);
    const category = categories[Math.floor(Math.random() * categories.length)];
    const word =
      words[category][Math.floor(Math.random() * words[category].length)];
    return { word, category };
  }, [words]);

  // STARTS THE SECRET WORD GAME.
  const startGame = useCallback(() => {
    clearLettersStates();
    const { word, category } = pickWordAndCategory();

    let wordLetters = word.split("").map((l) => l.toLowerCase());

    setPickedWord(word);
    setPickedCategory(category);
    setLetters(wordLetters);
    setGameStage(stages[1].name);
  }, [clearLettersStates, pickWordAndCategory]);

  // PROCESS THE LETTER INPUT.
  const verifyLetter = (letter) => {
    const normalizedLetter = letter.toLowerCase();

    if (
      guessedLetters.includes(normalizedLetter) ||
      wrongLetters.includes(normalizedLetter)
    ) {
      return;
    }

    if (letters.includes(normalizedLetter)) {
      setGuessedLetters((actualGuessedLetters) => [
        ...actualGuessedLetters,
        normalizedLetter,
      ]);
    } else {
      setWrongLetters((actualWrongLetters) => [
        ...actualWrongLetters,
        normalizedLetter,
      ]);

      setGuesses((actualGuesses) => actualGuesses - 1);
    }
  };

  // CHECK IF GUESSES ENDED.
  useEffect(() => {
    if (guesses <= 0) {
      clearLettersStates();
      setGameStage(stages[2].name);
    }
  }, [guesses, clearLettersStates]);

  const showVictoryMessageAndNextGame = useCallback(() => {
    setShowWinMessage(true);
    setTimeout(() => {
      setShowWinMessage(false);
      startGame(); // reinicia o jogo com nova palavra
    }, 1000); // 1 segundo
  }, [startGame]);

  // CHECK WIN CONDITION.
  useEffect(() => {
    if (gameStage !== "game") return; // só executa se estiver no estágio do jogo

    const uniqueLetters = [...new Set(letters)];
    if (guessedLetters.length === uniqueLetters.length) {
      setScore((actualScore) => actualScore + 100);
      showVictoryMessageAndNextGame();
    }
  }, [
    guessedLetters,
    letters,
    startGame,
    showVictoryMessageAndNextGame,
    gameStage,
  ]);

  // RESTARTS THE GAME.
  const retry = () => {
    setScore(0);
    setGuesses(guessesQty);
    setGameStage(stages[0].name);
  };

  const handleWordGuessSuccess = () => {
    setScore((prevScore) => prevScore + 100);
    startGame(); // reinicia o jogo com nova palavra
  };

  const handleWordGuessFailure = () => {
    setGuesses((prevGuesses) => prevGuesses - 1); // penaliza tentativa
  };

  return (
    <div className="App">
      {gameStage === "start" && <StartScreen startGame={startGame} />}
      {gameStage === "game" && (
        <Game
          verifyLetter={verifyLetter}
          pickedWord={pickedWord}
          pickedCategory={pickedCategory}
          letters={letters}
          guessedLetters={guessedLetters}
          wrongLetters={wrongLetters}
          guesses={guesses}
          score={score}
          onWordGuess={handleWordGuessSuccess}
          onWrongWordGuess={handleWordGuessFailure}
          showWinMessage={showWinMessage}
        />
      )}
      {gameStage === "end" && <GameOver retry={retry} score={score} />}
    </div>
  );
}

export default App;
