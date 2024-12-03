const input = await Bun.file("./input.txt").text();
type Instruction =
  | { type: "Do" }
  | { type: "Don't" }
  | { type: "Mul"; args: [number, number] };

const regex = /mul\(\d\d?\d?,\d\d?\d?\)|don't\(\)|do\(\)/g;

const program = input
  .matchAll(regex)
  .map((e) => parseInstruction(e.toString()))
  .toArray();

let enabled = true;
let sum = 0;

for (const instr of program) {
  if (instr.type === "Do") {
    enabled = true;
    continue;
  }
  if (instr.type === "Don't") {
    enabled = false;
    continue;
  }

  if (enabled) {
    sum += instr.args[0] * instr.args[1];
  }
}

console.log(sum);

function parseInstruction(str: string): Instruction {
  if (str === "do()") {
    return { type: "Do" };
  } else if (str === "don't()") {
    return { type: "Don't" };
  } else {
    const [left, right] = str.slice(4, -1).split(",").map(Number);

    return { type: "Mul", args: [left!, right!] };
  }
}
