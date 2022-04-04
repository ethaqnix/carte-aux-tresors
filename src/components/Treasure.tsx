import React from "react";

interface ITreasureProps {
  amount: number;
}

const Treasure = ({ amount }: ITreasureProps) => {
  return <h2>{amount}</h2>;
};

export default Treasure;
