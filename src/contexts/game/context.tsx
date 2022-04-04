import React, { FunctionComponent, useReducer } from "react";
import { GameAction, goToEnd, run, setGame } from "./actions";
import GameReducer, { initialGameState, IGameState } from "./reducer";

const GameStateContext = React.createContext<IGameState>(initialGameState);

const GameDispatchContext = React.createContext<React.Dispatch<GameAction>>(
  () => {}
);

const getActions = (
  state: IGameState,
  dispatch: React.Dispatch<GameAction>
) => ({
  run: run(state, dispatch),
  setGame: setGame(state, dispatch),
  goToEnd: goToEnd(state, dispatch),
});

export function useGameState() {
  const context = React.useContext(GameStateContext);
  if (context === undefined) {
    throw new Error("useGameState must be used within a GameProvider");
  }

  return context;
}

export const useGameDispatch = () => {
  const stateContext = React.useContext(GameStateContext);
  const context = React.useContext(GameDispatchContext);
  if (context === undefined) {
    throw new Error("useGameDispatch must be used within a GameProvider");
  }

  return { context, ...getActions(stateContext, context) };
};

export const useGame = (): [
  IGameState,
  { context: React.Dispatch<GameAction>; [key: string]: any }
] => {
  const stateContext = React.useContext(GameStateContext);
  const dispatchContext =
    React.useContext<React.Dispatch<GameAction>>(GameDispatchContext);
  if (stateContext === undefined || dispatchContext === undefined) {
    throw new Error("useGame must be used within a GameProvider");
  }
  return [
    stateContext,
    { context: dispatchContext, ...getActions(stateContext, dispatchContext) },
  ];
};

interface GameProviderProps {
  children: React.ReactNode;
  initialState?: Partial<IGameState>;
}

export const GameProvider: FunctionComponent<GameProviderProps> = ({
  children,
  initialState = { type: "" },
}) => {
  const [value, dispatch] = useReducer(GameReducer, initialGameState);
  return (
    <GameStateContext.Provider value={value}>
      <GameDispatchContext.Provider value={dispatch}>
        {children}
      </GameDispatchContext.Provider>
    </GameStateContext.Provider>
  );
};
