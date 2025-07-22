import { useState, useRef } from "react";
import "./Game.css";

const Game = ({
  verifyLetter,
  pickedWord,
  pickedCategory,
  letters,
  guessedLetters,
  wrongLetters,
  guesses,
  score,
  onWordGuess,
  onWrongWordGuess,
  showWinMessage,
}) => {
  const [letter, setLetter] = useState("");
  const [wordGuess, setWordGuess] = useState("");
  const [wrongWords, setWrongWords] = useState([]);
  const letterInputRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    verifyLetter(letter);

    setLetter("");

    letterInputRef.current.focus();
  };

  const handleWordGuess = (e) => {
    e.preventDefault();
    const normalizedGuess = wordGuess.toLowerCase();
    if (normalizedGuess === pickedWord.toLowerCase()) {
      if (onWordGuess) onWordGuess();
    } else {
      alert("Palavra errada! Você perdeu uma tentativa.");
      setWrongWords((prev) => [...prev, normalizedGuess]);
      if (onWrongWordGuess) onWrongWordGuess();
    }
    setWordGuess("");
  };

  return (
    <div className="game">
      <p className="points">
        <span>Pontuação: {score}</span>
      </p>
      <h1>Advinhe a palavra:</h1>
      <h3 className="tip">
        Dica sobre a palavra: <span>{pickedCategory}</span>
      </h3>
      <p>Você ainda tem {guesses} tentativas(s).</p>

      {showWinMessage && (
        <div className="win-message">
          <h2>🎉 Você venceu a rodada! 🎉</h2>
        </div>
      )}

      <div className="wordContainer">
        {letters.map((letter, i) =>
          guessedLetters.includes(letter) ? (
            <span key={i} className="letter">
              {letter}
            </span>
          ) : (
            <span key={i} className="blankSquare"></span>
          )
        )}
      </div>
      <div className="letterContainer">
        <p>Tente adivinhar uma letra da palavra:</p>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="letter"
            maxLength="1"
            required
            onChange={(e) => setLetter(e.target.value)}
            value={letter}
            ref={letterInputRef}
          />
          <button>Jogar!</button>
        </form>
      </div>
      <div className="wordGuessContainer">
        <p>Ou tente adivinhar a palavra completa:</p>
        <form onSubmit={handleWordGuess}>
          <input
            type="text"
            name="wordGuess"
            required
            onChange={(e) => setWordGuess(e.target.value)}
            value={wordGuess}
          />
          <button>Chutar palavra!</button>
        </form>
      </div>

      <div className="wrongLettersContainer">
        <p>Letras já utilizadas:</p>
        {wrongLetters.map((letter, i) => (
          <span key={i}>{letter}, </span>
        ))}
      </div>
      <div className="wrongWordsContainer">
        <p>Palavras já chutadas:</p>
        {wrongWords.map((word, i) => (
          <span key={i}>
            {word}
            {i < wrongWords.length - 1 ? ", " : ""}
          </span>
        ))}
      </div>
    </div>
  );
};

export default Game;
