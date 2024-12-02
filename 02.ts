const input = await Bun.file("./input.txt").text();

const safeAmount = input
  .split("\n")
  .map((line) => line.split(" ").map(Number))
  .map(reportIsSafe)
  .filter((e) => e === true).length;

console.log(safeAmount);

function reportIsSafe(report: number[]): boolean {
  const isIncreasing = report[0]! < report[1]!;

  let cur = report[0]!;
  report.shift();

  for (const level of report) {
    if (isIncreasing) {
      const diff = level - cur;

      if (diff > 0 && diff < 4) {
        cur = level;
        continue;
      }

      return false;
    } else {
      const diff = cur - level;

      if (diff > 0 && diff < 4) {
        cur = level;
        continue;
      }

      return false;
    }
  }

  return true;
}
