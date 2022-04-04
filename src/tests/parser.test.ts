import {
  parseDimensions,
  parseFile,
  parseLine,
  parseTreasure,
} from "../helpers/parser";

test("dimensions", () => {
  let res = parseFile("C-1-2");
  const expectedSuccessLineResult = { dimensions: { width: 1, height: 2 } };
  const expectedSuccessFileResult = {
    adventurers: [],
    treasures: [],
    mountains: [],
    ...expectedSuccessLineResult,
  };

  expect(res).toEqual(expectedSuccessFileResult);

  let parseLineResult = parseLine("C-1-2");
  expect(parseLineResult).toEqual(expectedSuccessLineResult);
  let parseLineErrorResult1 = parseDimensions(["C", "A", "2"]);
  let parseLineErrorResult2 = parseDimensions(["C"]);
  let parseLineErrorResult3 = parseDimensions(["C", "1"]);

  expect(parseLineErrorResult1.errors).toBeDefined();
  expect(parseLineErrorResult2.errors).toBeDefined();
  expect(parseLineErrorResult3.errors).toBeDefined();
});

test("mountains", () => {
  let res = parseFile("M-1-2-1");
  const expectedMountain = { x: 1, y: 2 };
  const expectedSuccessFileResult = {
    adventurers: [],
    treasures: [],
    mountains: [expectedMountain],
  };
  console.log(res);

  expect(res).toEqual(expectedSuccessFileResult);

  let parseLineResult = parseLine("M-1-2");
  console.log(parseLineResult);

  expect(parseLineResult).toEqual({ mountain: expectedMountain });
  let parseLineErrorResult1 = parseDimensions(["M", "A", "2"]);
  let parseLineErrorResult2 = parseDimensions(["M"]);
  let parseLineErrorResult3 = parseDimensions(["M", "1"]);

  expect(parseLineErrorResult1.errors).toBeDefined();
  expect(parseLineErrorResult2.errors).toBeDefined();
  expect(parseLineErrorResult3.errors).toBeDefined();
});

test("treasures", () => {
  let res = parseFile("T-1-2-1");

  const expectedTreasure = { x: 1, y: 2, amount: 1 };
  const expectedSuccessFileResult = {
    adventurers: [],
    mountains: [],
    treasures: [expectedTreasure],
  };

  expect(res).toEqual(expectedSuccessFileResult);

  let parseLineResult = parseLine("T-1-2-1");
  expect(parseLineResult).toEqual({ treasure: expectedTreasure });
  let parseLineErrorResult1 = parseTreasure(["T", "A", "2"]);
  let parseLineErrorResult2 = parseTreasure(["T"]);
  let parseLineErrorResult3 = parseTreasure(["T", "1"]);

  expect(parseLineErrorResult1.errors).toBeDefined();
  expect(parseLineErrorResult2.errors).toBeDefined();
  expect(parseLineErrorResult3.errors).toBeDefined();
});

test("parse file FINAL", () => {
  const result = parseFile(
    "C - 3 - 4\n\
    A - Lara - 1 - 1 - S - AADADAGGA\n\
    M - 1 - 0\n\
    # hello there \n\
    M - 2 - 1 \n\
    T - 0 - 3 - 2\n\
    T - 1 - 3 - 3\n"
  );

  expect(result).toEqual({
    adventurers: [
      {
        name: "Lara",
        orientation: "S",
        pattern: ["A", "A", "D", "A", "D", "A", "G", "G", "A"],
        position: {
          x: 1,
          y: 1,
        },
      },
    ],
    dimensions: {
      height: 4,
      width: 3,
    },
    mountains: [
      {
        x: 1,
        y: 0,
      },
      {
        x: 2,
        y: 1,
      },
    ],
    treasures: [
      {
        amount: 2,
        x: 0,
        y: 3,
      },
      {
        amount: 3,
        x: 1,
        y: 3,
      },
    ],
  });
});
