const input = await Bun.file("./input.txt").text();

const safeAmount = input
  .split("\n")
  .map((line) => line.split(" ").map(Number))
  .map((report) => {
    if (reportIsSafe(report)) {
      return true;
    }

    for (let i = 0; i < report.length; i++) {
      const spliced = report.toSpliced(i, 1);

      if (reportIsSafe(spliced)) {
        return true;
      }
    }

    return false;
  })
  .filter((e) => e === true).length;

console.log(safeAmount);

function reportIsSafe(reportParam: number[]): boolean {
  const report = [...reportParam];

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
