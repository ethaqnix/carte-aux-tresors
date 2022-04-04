import React from "react";
import { GameProvider } from "../../contexts/game";
import Game from "./Game";

const GameContainer = () => {
  return (
    <GameProvider>
      <Game />
    </GameProvider>
  );
};

export default GameContainer;
