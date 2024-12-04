const input = await Bun.file("./input.txt").text();

const CHARS = ["X", "M", "A", "S"] as const;

type Char = (typeof CHARS)[number];

const grid = input.split("\n").map((line) => line.split("") as Char[]);
const colLength = grid.length;
const rowLength = grid[0]!.length;

let sum = 0;

for (let i = 0; i < colLength; i++) {
  for (let j = 0; j < rowLength; j++) {
    if (isXmas(i, j)) sum++;
  }
}

console.log(sum);

function isXmas(row: number, col: number): boolean {
  if (row >= colLength - 1 || row < 1 || col >= rowLength - 1 || col < 1)
    return false;

  if (grid[row]![col]! !== "A") return false;

  const diag1 = [grid[row + 1]![col + 1]!, grid[row - 1]![col - 1]!]
    .sort()
    .join("");
  const diag2 = [grid[row + 1]![col - 1]!, grid[row - 1]![col + 1]!]
    .sort()
    .join("");

  if (diag1 !== "MS" || diag2 !== "MS") return false;

  return true;
}
