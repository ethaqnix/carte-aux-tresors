import { IAdventurer } from "../types/Adventurer";
import { IMap, IMountain, IPosition, ITreasure } from "../types/Map";

export const isValid = (
  comparisonFunction: (element: any) => boolean,
  compareElement: any
): boolean => {
  try {
    if (comparisonFunction(compareElement)) return true;
  } catch (e) {
    return false;
  }
  return false;
};

export const checkDimensions = (dimensions: any): dimensions is IMap => {
  const { width, height } = dimensions;
  if (width <= 0) {
    throw new Error("Map width should be upper than 0");
  }
  if (isNaN(width)) {
    throw new Error("Map width - bad format");
  }
  if (height <= 0) {
    throw new Error("Map height should be upper than 0");
  }
  if (isNaN(height)) {
    throw new Error("Map height - bad format");
  }

  return true;
};

export const checkPosition = (position: any): position is IPosition => {
  const { x, y } = position;
  if (x < 0 || isNaN(x)) {
    throw new Error("Invalid x position");
  }
  if (y < 0 || isNaN(y)) {
    throw new Error("Invalid x position");
  }
  return true;
};

export const checkAdventurer = (adventurer: any): adventurer is IAdventurer => {
  const { name, orientation, position, pattern } = adventurer;

  if (!name || typeof name !== "string")
    throw new Error("Adventurer name - bad format");
  if (!isValid(checkPosition, position))
    throw new Error("Adventurer position - bad format");
  if (!["N", "S", "E", "W"].includes(orientation))
    throw new Error("Adventurer orientation - bad format");
  if (pattern.find((action: any) => !["D", "G", "A"].includes(action))) {
    throw new Error("Adventurer pattern - bad format");
  }
  return true;
};

export const checkTreasure = (treasure: any): treasure is ITreasure => {
  const { amount, x, y } = treasure;

  if (!isValid(checkPosition, { x, y }))
    throw new Error("Treasure position - bad format");
  if (!amount || isNaN(amount) || amount < 0) {
    throw new Error("Treasure amount - bad format");
  }
  return true;
};

export const checkMontain = (mountain: any): mountain is IMountain => {
  const { x, y } = mountain;
  if (!isValid(checkPosition, { x, y }))
    throw new Error("Treasure position - bad format");
  return true;
};
