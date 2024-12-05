const input = await Bun.file("./input.txt").text();

const [rulesInput, updatesInput] = input.split("\n\n");

const rules = rulesInput!
  .split("\n")
  .map((line) => line.split("|").map(Number) as [number, number]);

const updates = updatesInput!
  .split("\n")
  .map((line) => line.split(",").map(Number));

const correctUpdates = updates.filter((update) =>
  rules.every((rule) => !ruleBroken(rule, update))
);

const result = correctUpdates
  .map((update) => update[Math.floor(update.length / 2)]!)
  .reduce((acc, x) => acc + x, 0);

console.log(result);

function ruleBroken(rule: [number, number], update: number[]): boolean {
  const idx = update.findIndex((page) => page === rule[0]);

  if (idx === -1) return false;

  const rest = update.slice(0, idx);

  if (!rest.includes(rule[1])) return false;

  return true;
}
