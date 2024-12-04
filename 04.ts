const input = await Bun.file("./input.txt").text();

const CHARS = ["X", "M", "A", "S"] as const;

type Char = (typeof CHARS)[number];

const directions: [number, number][] = [
  [-1, -1],
  [-1, 0],
  [-1, 1],
  [0, -1],
  [0, 1],
  [1, -1],
  [1, 0],
  [1, 1],
];

const grid = input.split("\n").map((line) => line.split("") as Char[]);
const colLength = grid.length;
const rowLength = grid[0]!.length;

let sum = 0;

for (let i = 0; i < colLength; i++) {
  for (let j = 0; j < rowLength; j++) {
    for (const dir of directions) {
      if (hasXmas(i, j, dir)) sum++;
    }
  }
}

console.log(sum);

function hasXmas(row: number, col: number, dir: [number, number]): boolean {
  const dirX = dir[0];
  const dirY = dir[1];

  let curRow = row;
  let curCol = col;

  for (const charToMatch of CHARS) {
    if (curRow >= colLength || curRow < 0 || curCol >= rowLength || curCol < 0)
      return false;

    const char = grid[curRow]![curCol]!;

    if (char !== charToMatch) return false;

    curRow += dirY;
    curCol += dirX;
  }

  return true;
}
