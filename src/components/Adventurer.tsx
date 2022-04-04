import React from "react";
import { IAdventurer } from "../types/Adventurer";
import AdventurerFront from "../assets/adventurer/adventurer-front.png";
import AdventurerBack from "../assets/adventurer/adventurer-back.png";
import AdventurerLeft from "../assets/adventurer/adventurer-left.png";
import AdventurerRigth from "../assets/adventurer/adventurer-rigth.png";
import Treasure from "./Treasure";

interface IAdventurerProps {
  adventurer: IAdventurer;
}

const Adventurer = ({ adventurer }: IAdventurerProps) => {
  const { treasures, orientation } = adventurer;

  const getAsset = () => {
    switch (orientation) {
      case "S":
        return AdventurerFront;
      case "N":
        return AdventurerBack;
      case "W":
        return AdventurerLeft;
      case "E":
        return AdventurerRigth;
    }
  };

  return (
    <div>
      {treasures && <Treasure amount={treasures} />}
      <img src={getAsset()} alt="Logo" />
    </div>
  );
};

export default Adventurer;
