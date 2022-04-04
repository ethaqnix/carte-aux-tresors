import { IAdventurer } from "./Adventurer";

export interface IPosition {
  x: number;
  y: number;
}

interface ITreasure extends IPosition {
  amount: number;
}

interface IMountain extends IPosition {}

export interface ISquare {
  isMontain?: boolean;
  treasures: number;
  adventurer?: IAdventurer;
}

export interface IMap {
  width: number;
  height: number;
}

interface IInitGame {
  dimensions: IMap;
  adventurers: IAdventurer[];
  treasures: ITreasure[];
  mountains: IMountain[];
}
