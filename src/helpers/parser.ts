import { IAdventurer, IMovement, IOrientation } from "../types/Adventurer";
import { IInitGame, IMountain, ITreasure } from "../types/Map";
import errors from "../utils/errors";
import {
  checkDimensions,
  checkAdventurer,
  checkTreasure,
  checkMontain,
} from "./validator";

interface IParsedFile extends IInitGame {
  errors?: string[];
}

const parseDimensions = (params: string[]): Partial<IParsedFile> => {
  try {
    const [, width, height] = params;
    if (params.length > 3) {
      return {};
    }
    const result = {
      dimensions: { width: parseInt(width), height: parseInt(height) },
    };
    if (checkDimensions(result.dimensions)) return result;
  } catch (e) {
    return { errors: [(e as Error).message] };
  }
  return { errors: ["Invalid dimensions"] };
};

const parseAdventurer = (
  params: string[]
): { adventurer?: Partial<IAdventurer>; errors?: string[] } => {
  try {
    const [, name, x, y, orientation, pattern] = params;

    const result = {
      adventurer: {
        name,
        position: { x: parseInt(x), y: parseInt(y) },
        orientation: orientation as IOrientation,
        pattern: pattern.split("") as IMovement[],
      },
    };
    if (checkAdventurer(result.adventurer)) return result;
  } catch (e) {
    return { errors: [e as string] };
  }
  return { errors: ["Invalid adventurer format"] };
};

const parseTreasure = (
  params: string[]
): { treasure?: Partial<ITreasure>; errors?: string[] } => {
  try {
    const [, x, y, amount] = params;
    const result = {
      treasure: { x: parseInt(x), y: parseInt(y), amount: parseInt(amount) },
    };
    if (checkTreasure(result.treasure)) return result;
  } catch (e) {
    return { errors: [e as string] };
  }
  return { errors: ["Invalid treasure format"] };
};

const parseMountain = (
  params: string[]
): { mountain?: Partial<IMountain>; errors?: string[] } => {
  try {
    const [, x, y] = params;
    const result = { mountain: { x: parseInt(x), y: parseInt(y) } };
    if (checkMontain(result.mountain)) return result;
  } catch (e) {
    return { errors: [e as string] };
  }
  return { errors: ["Invalid moutain format"] };
};

const parseLine = (line: string) => {
  const settings = line.split("-");

  switch (settings[0]) {
    case "T":
      return parseTreasure(settings);
    case "C":
      return parseDimensions(settings);
    case "M":
      return parseMountain(settings);
    case "A":
      return parseAdventurer(settings);
    case "#":
      return {};
    default:
      return { errors: [errors.unknown_format] };
  }
};

const parseFile = (content: string): IParsedFile => {
  const regex = /[\r| ]/gi;

  let epuredContent = content.replace(regex, "");

  let lines = epuredContent.split("\n");
  return lines.reduce(
    (entities: any, line: string) => {
      const parsedLine: any = parseLine(line);

      let updatedEntities = entities;
      if (parsedLine.treasure) {
        updatedEntities.treasures.push(parsedLine.treasure);
      } else if (parsedLine.mountain) {
        updatedEntities.mountains.push(parsedLine.mountain);
      } else if (parsedLine.dimensions) {
        updatedEntities.dimensions = parsedLine.dimensions;
      } else if (parsedLine.adventurer) {
        updatedEntities.adventurers.push(parsedLine.adventurer);
      }

      return updatedEntities;
    },
    {
      adventurers: [],
      treasures: [],
      mountains: [],
    }
  );
};

export {
  parseAdventurer,
  parseFile,
  parseLine,
  parseTreasure,
  parseMountain,
  parseDimensions,
};
