const input = await Bun.file("./input.txt").text();

const [rulesInput, updatesInput] = input.split("\n\n");

const rules = rulesInput!
  .split("\n")
  .map((line) => line.split("|").map(Number) as [number, number]);

const updates = updatesInput!
  .split("\n")
  .map((line) => line.split(",").map(Number));

const fixedUpdates = updates.filter((update) => {
  let fixed = false;

  for (const rule of rules) {
    if (updateNeededFix(rule, update)) fixed = true;
  }

  return fixed;
});

for (let i = 0; i < 100; i++) {
  fixedUpdates.forEach((update) => {
    for (const rule of rules) {
      updateNeededFix(rule, update);
    }
  });
}

const result = fixedUpdates
  .map((update) => update[Math.floor(update.length / 2)]!)
  .reduce((acc, x) => acc + x, 0);

console.log(result);

function updateNeededFix(rule: [number, number], update: number[]): boolean {
  const idx = update.findIndex((page) => page === rule[0]);

  if (idx === -1) return false;

  const rest = update.slice(0, idx);

  const restIdx = rest.findIndex((page) => page === rule[1]);

  if (restIdx === -1) return false;

  console.log(`Update before fix of rule [${rule}]: ${update}`);

  const tmp = update[idx]!;
  update[idx] = update[restIdx]!;
  update[restIdx] = tmp;

  console.log(`Update after fix of rule [${rule}]: ${update}`);

  return true;
}
