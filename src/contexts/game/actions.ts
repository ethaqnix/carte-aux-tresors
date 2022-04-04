import { higtherPriority } from "../../helpers/compare";
import { IAdventurer, IOrientation } from "../../types/Adventurer";
import { IInitGame, IPosition, ISquare, ITreasure } from "../../types/Map";
import { IGameState } from "./reducer";

export type GameAction = IRunAction | ISetGameAction | ISetStateAction;

export interface IRunAction {
  type: "RUN";
}

export interface ISetGameAction {
  type: "SET_GAME";
}

export interface ISetStateAction {
  type: "SET_STATE";
  payload: Partial<IGameState>;
}

export const moveTo = (
  map: ISquare[][],
  adventurer: IAdventurer,
  target: IPosition,
  orientation: IOrientation
) => {
  console.log(map, adventurer);

  let updatedMap = map;

  let updatedAdventurer = {
    ...adventurer,
    pattern: adventurer.pattern.slice(1),
  };
  updatedAdventurer.orientation = orientation;

  if (!map.length || !map[0].length) return { map, adventurer };
  /* out of map */
  if (
    target.x < 0 ||
    target.x >= map[0].length ||
    target.y < 0 ||
    target.y >= map.length
  ) {
    console.log("off map", adventurer.position);

    updatedMap[adventurer.position.y][adventurer.position.x].adventurer =
      updatedAdventurer;
    console.log("updatedMap", updatedMap);

    return { map: updatedMap, adventurer: updatedAdventurer };
  }

  let nextSquare = map[target.y][target.x];

  if (!nextSquare.isMontain && !nextSquare.adventurer) {
    updatedAdventurer.position = {
      x: target.x,
      y: target.y,
    };
    /*  */
    if (nextSquare.treasures && nextSquare.treasures > 0) {
      nextSquare.treasures -= 1;
      updatedAdventurer.treasures += 1;
    }
    nextSquare.adventurer = updatedAdventurer;
    delete updatedMap[adventurer.position.y][adventurer.position.x].adventurer;
    updatedMap[target.y][target.x] = nextSquare;
  } else {
    updatedMap[adventurer.position.y][adventurer.position.x].adventurer =
      updatedAdventurer;
  }
  return { map: updatedMap, adventurer: updatedAdventurer };
};

const goUp = (map: ISquare[][], adventurer: IAdventurer) => {
  return moveTo(
    map,
    adventurer,
    {
      x: adventurer.position.x,
      y: adventurer.position.y - 1,
    },
    "N"
  );
};

const goLeft = (map: ISquare[][], adventurer: IAdventurer) => {
  return moveTo(
    map,
    adventurer,
    {
      x: adventurer.position.x - 1,
      y: adventurer.position.y,
    },
    "W"
  );
};

const goRight = (map: ISquare[][], adventurer: IAdventurer) => {
  return moveTo(
    map,
    adventurer,
    {
      x: adventurer.position.x + 1,
      y: adventurer.position.y,
    },
    "E"
  );
};

const goDown = (map: ISquare[][], adventurer: IAdventurer) => {
  return moveTo(
    map,
    adventurer,
    {
      x: adventurer.position.x,
      y: adventurer.position.y + 1,
    },
    "S"
  );
};

type ActionTable = {
  [key in IOrientation]: (
    map: ISquare[][],
    adventurer: IAdventurer
  ) => { map: ISquare[][]; adventurer: IAdventurer };
};

const ATable: ActionTable = {
  N: goUp,
  S: goDown,
  E: goRight,
  W: goLeft,
};

const DTable: ActionTable = {
  N: goRight,
  S: goLeft,
  E: goDown,
  W: goUp,
};

const GTable: ActionTable = {
  N: goLeft,
  S: goRight,
  E: goUp,
  W: goDown,
};

const move = (map: ISquare[][], adventurer: IAdventurer) => {
  const { pattern, orientation } = adventurer;
  if (!pattern.length) return { map, adventurer };
  const movment = pattern[0];
  switch (movment) {
    case "A":
      return ATable[orientation](map, adventurer);
    case "D":
      return DTable[orientation](map, adventurer);
    case "G":
      return GTable[orientation](map, adventurer);
    default:
      return { map, adventurer };
  }
};

export const run =
  (state: IGameState, dispatch: React.Dispatch<GameAction>) => () => {
    const { map, adventurers } = state;
    let updatedMap = map;
    let isDone = true;
    const updatedAdventurers = adventurers
      .sort(higtherPriority)
      .map((adventurer) => {
        const { position, treasures, pattern } = adventurer;
        if (pattern.length === 0) return adventurer;
        const { map: mapAfterMovment, adventurer: updatedAdventurer } = move(
          updatedMap,
          adventurer
        );
        if (updatedAdventurer && updatedAdventurer.pattern.length)
          isDone = false;
        updatedMap = mapAfterMovment;
        return updatedAdventurer;
      });
    const update = {
      adventurers: updatedAdventurers,
      map: updatedMap,
      isDone,
    };
    dispatch({
      type: "SET_STATE",
      payload: update,
    });
    return update;
  };

export const setGame =
  (state: IGameState, dispatch: React.Dispatch<GameAction>) =>
  (content: IInitGame) => {
    try {
      const { dimensions, adventurers, treasures, mountains } = content;
      let map: ISquare[][] = [];

      for (let i = 0; i < dimensions.height; i++) {
        map.push([]);
        for (let j = 0; j < dimensions.width; j++) {
          map[i].push({ treasures: 0 });
        }
      }

      adventurers.forEach((adventurer) => {
        map[adventurer.position.y][adventurer.position.x].adventurer =
          adventurer;
      });
      treasures.forEach(({ x, y, amount }) => {
        map[y][x].treasures += map[y][x].treasures
          ? map[y][x].treasures + amount
          : amount;
      });
      mountains.forEach(({ x, y }) => {
        map[y][x].isMontain = true;
      });
      let isReady = false;
      if (true && adventurers.length) isReady = true;
      console.log("isReady", isReady);

      dispatch({
        type: "SET_STATE",
        payload: {
          adventurers: adventurers.map((adventurer, i) => ({
            ...adventurer,
            treasures: 0,
            priority: i,
          })),
          map: map,
          isReady,
          isDone: false,
        },
      });
    } catch (e) {
      console.log("error", e);

      dispatch({ type: "SET_STATE", payload: { isReady: false } });
      throw e;
    }
  };

export const goToEnd =
  (state: IGameState, dispatch: React.Dispatch<GameAction>) => async () => {
    let nextState: Partial<IGameState> = state;
    while (!nextState.isDone) {
      nextState = run({ ...state, ...nextState }, dispatch)();
    }
  };
