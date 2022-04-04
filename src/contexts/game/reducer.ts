import { GameAction } from "./actions";
import { IAdventurer } from "../../types/Adventurer";
import { ISquare } from "../../types/Map";

export interface IGameState {
  isReady: boolean;
  isStarted: boolean;
  isDone: boolean;
  map: ISquare[][];
  adventurers: IAdventurer[];
}

export const initialGameState: IGameState = {
  isReady: false,
  isStarted: false,
  isDone: false,
  adventurers: [],
  map: [],
};

const gameReducer = (
  state: IGameState = initialGameState,
  action: GameAction
): IGameState => {
  switch (action.type) {
    case "SET_GAME":
      return {
        ...state,
      };
    case "RUN":
      return {
        ...state,
      };
    case "SET_STATE":
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};

export default gameReducer;
