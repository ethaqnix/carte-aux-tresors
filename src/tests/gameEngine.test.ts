import { moveTo } from "../contexts/game/actions";
import { IAdventurer } from "../types/Adventurer";
import { ISquare } from "../types/Map";

test("moveBasic", () => {
  const adventurer: IAdventurer = {
    position: { x: 0, y: 1 },
    priority: 1,
    pattern: ["A", "A"],
    name: "basicAdventurer",
    orientation: "S",
    treasures: 0,
  };
  let map: ISquare[][] = [
    [{ treasures: 0 }],
    [{ treasures: 0 }],
    [{ treasures: 0 }],
    [{ treasures: 0 }],
  ];
  const move = moveTo(map, adventurer, { x: 0, y: 0 }, "N");

  expect(move.map).toEqual([
    [
      {
        treasures: 0,
        adventurer: {
          name: "basicAdventurer",
          orientation: "N",
          pattern: ["A"],
          position: { x: 0, y: 0 },
          priority: 1,
          treasures: 0,
        },
      },
    ],
    [{ treasures: 0 }],
    [{ treasures: 0 }],
    [{ treasures: 0 }],
  ]);
});

test("move on map inexistant", () => {
  const mapInexistant: ISquare[][] = [];

  const adventurer: IAdventurer = {
    position: { x: 0, y: 1 },
    priority: 1,
    pattern: ["A", "A"],
    name: "basicAdventurer",
    orientation: "S",
    treasures: 0,
  };
  const move = moveTo(mapInexistant, adventurer, { x: 0, y: 0 }, "N");

  expect(move.map).toEqual([]);
  expect(move.adventurer).toEqual(adventurer);
});

test("move off map", () => {
  const adventurer: IAdventurer = {
    position: { x: 0, y: 0 },
    priority: 1,
    pattern: ["A", "A"],
    name: "basicAdventurer",
    orientation: "S",
    treasures: 0,
  };
  let map: ISquare[][] = [
    [{ treasures: 0, adventurer }],
    [{ treasures: 0 }],
    [{ treasures: 0 }],
    [{ treasures: 0 }],
  ];
  const move = moveTo(map, adventurer, { x: 1, y: 0 }, "N");

  expect(move.map).toEqual([
    [
      {
        treasures: 0,
        adventurer: {
          ...adventurer,
          orientation: "N",
          pattern: ["A"],
        },
      },
    ],
    [{ treasures: 0 }],
    [{ treasures: 0 }],
    [{ treasures: 0 }],
  ]);
  expect(move.adventurer).toEqual({
    ...adventurer,
    orientation: "N",
    pattern: ["A"],
  });
});

test("move on mountain", () => {
  const adventurer: IAdventurer = {
    position: { x: 0, y: 0 },
    priority: 1,
    pattern: ["A", "A"],
    name: "basicAdventurer",
    orientation: "S",
    treasures: 0,
  };
  let map: ISquare[][] = [
    [{ treasures: 0, adventurer }],
    [{ treasures: 0, isMontain: true }],
    [{ treasures: 0 }],
    [{ treasures: 0 }],
  ];
  const move = moveTo(map, adventurer, { x: 0, y: 1 }, "S");

  expect(move.map).toEqual([
    [
      {
        treasures: 0,
        adventurer: {
          ...adventurer,
          orientation: "S",
          pattern: ["A"],
        },
      },
    ],
    [{ treasures: 0, isMontain: true }],
    [{ treasures: 0 }],
    [{ treasures: 0 }],
  ]);
  expect(move.adventurer).toEqual({
    ...adventurer,
    orientation: "S",
    pattern: ["A"],
  });
});

test("move on treasure", () => {
  const adventurer: IAdventurer = {
    position: { x: 0, y: 0 },
    priority: 1,
    pattern: ["A", "A"],
    name: "basicAdventurer",
    orientation: "S",
    treasures: 0,
  };
  let map: ISquare[][] = [
    [{ treasures: 0, adventurer }],
    [{ treasures: 1 }],
    [{ treasures: 0 }],
    [{ treasures: 0 }],
  ];
  const move = moveTo(map, adventurer, { x: 0, y: 1 }, "S");

  const expectedAdventurer = {
    ...adventurer,
    position: { x: 0, y: 1 },
    treasures: 1,
    orientation: "S",
    pattern: ["A"],
  };
  expect(move.map).toEqual([
    [
      {
        treasures: 0,
      },
    ],
    [
      {
        treasures: 0,
        adventurer: expectedAdventurer,
      },
    ],
    [{ treasures: 0 }],
    [{ treasures: 0 }],
  ]);
  expect(move.adventurer).toEqual(expectedAdventurer);
});
