import "./GameOver.css";

const GameOver = ({ retry }) => {
  return (
    <div>
      <h1>GameOver</h1>
      <p>Obrigado por jogar!</p>
      <p>Clique no botão abaixo para reiniciar o jogo</p>
      <button onClick={retry}>Reiniciar o jogo</button>
      <p>Boa sorte na próxima vez!</p>
    </div>
  );
};

export default GameOver;