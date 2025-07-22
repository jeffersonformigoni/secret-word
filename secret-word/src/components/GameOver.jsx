import "./GameOver.css";

const GameOver = ({ retry, score }) => {
  return (
    <div>
      <h1>GameOver</h1>
      <h2>
        A sua pontuação foi: <span>{score}</span>
      </h2>
      <p>Obrigado por jogar!</p>
      {/* <p>Clique no botão abaixo para reiniciar o jogo</p> */}
      <button onClick={retry}>Reiniciar o jogo</button>
      <p>Boa sorte na próxima vez!</p>
    </div>
  );
};

export default GameOver;
