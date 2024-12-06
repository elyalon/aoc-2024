const input = await Bun.file("./input.txt").text();

type Point = { row: number; col: number };

const grid = input.split("\n").map((line) => line.split(""));
const numOfRows = grid.length;
const numOfCols = grid[0]!.length;

const dirs = [
  [-1, 0],
  [0, 1],
  [1, 0],
  [0, -1],
];

const guardPos = findGuard();
let guardDirIdx = 0;

const seenPositions = new Set<string>();

while (true) {
  seenPositions.add(JSON.stringify(guardPos));

  const nextRow = guardPos.row + dirs[guardDirIdx]![0]!;
  const nextCol = guardPos.col + dirs[guardDirIdx]![1]!;

  if (
    nextRow >= numOfRows ||
    nextRow < 0 ||
    nextCol >= numOfCols ||
    nextCol < 0
  ) {
    break;
  }

  if (grid[nextRow]![nextCol]! === "#") {
    guardDirIdx = (guardDirIdx + 1) % 4;
  } else {
    guardPos.row = nextRow;
    guardPos.col = nextCol;
  }
}

console.log(seenPositions.size);

function findGuard(): Point {
  for (let i = 0; i < numOfRows; i++) {
    for (let j = 0; j < numOfCols; j++) {
      if (grid[i]![j]! === "^") {
        return { row: i, col: j };
      }
    }
  }
  throw new Error("Couldn't find guard");
}
