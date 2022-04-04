import React from "react";
import { ISquare } from "../types/Map";
import Adventurer from "./Adventurer";
import Treasure from "./Treasure";

interface ISquareProps {
  square: ISquare;
}

const Square = ({ square }: ISquareProps) => {
  const { treasures, isMontain, adventurer } = square;

  return (
    <td
      style={{
        display: "table-cell",
        textAlign: "center",
        backgroundColor: isMontain ? "yellow" : "green",
        border: "solid",
      }}
    >
      {treasures ? <Treasure amount={treasures} /> : null}
      {adventurer && <Adventurer adventurer={adventurer} />}
    </td>
  );
};

export default Square;
