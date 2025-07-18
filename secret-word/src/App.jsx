// CSS
import "./App.css";

// REACT
import { useCallback, useEffect, useState } from "react";

// DATA
import { wordsList } from "./data/words";

// COMPONENTS
import StartScreen from "./components/StartScreen";
import Game from "./components/Game";
import GameOver from "./components/GameOver";

const stages = [
  { id: 1, name: "start" },
  { id: 2, name: "game" },
  { id: 3, name: "end" },
];

function App() {
  const [gameStage, setGameStage] = useState(stages[0].name);
  const [words] = useState(wordsList);

  const [pickedWord, setPickedWord] = useState("");
  const [pickedCategory, setPickedCategory] = useState("");
  const [letters, setLetters] = useState([]);

  const pickWordAndCategory = () => {
    const categories = Object.keys(words);
    const category = 
      categories[Math.floor(Math.random() * categories.length)];    

    console.log(category);

    //  PICK A RANDOM WORD
    const word = words[category][Math.floor(Math.random() * words[category].length)];
    console.log(word);

    return { word, category };

  };

  //  STARTS THE SECRET WORD GAME
  const startGame = () => {
    //  PICK WORD AND PICK CATEGORY
    const { word, category } = pickWordAndCategory();

    // CREATE AN ARRAY OF LETTERS.
    let wordLetters = word.split("");

    wordLetters = wordLetters.map((l) => l.toLowerCase());

    console.log(word, category);
    console.log(wordLetters);

    // FILL STATES
    setPickedWord(word);
    setPickedCategory(category);
    setLetters(wordLetters);

    //  SET GAME STAGE TO GAME
    setGameStage(stages[1].name);
  };

  //  PROCESS THE LETTER INPUT
  const verifyLetter = () => {
    setGameStage(stages[2].name);
  };

  //  RESTARTS THE GAME
  const retry = () => {
    setGameStage(stages[0].name);
  };

  return (
    <div className="App">
      {gameStage === "start" && <StartScreen startGame={startGame} />}
      {gameStage === "game" && <Game verifyLetter={verifyLetter} />}
      {gameStage === "end" && <GameOver retry={retry} />}
    </div>
  );
}

export default App;
