const input = await Bun.file("./input.txt").text();

const regex = /mul\(\d\d?\d?,\d\d?\d?\)/g;

const muls = input.matchAll(regex).toArray();

const result = muls
  .map((mul) => execMul(mul.toString()))
  .reduce((acc, x) => acc + x, 0);

console.log(result);

function execMul(mul: string): number {
  const [left, right] = mul.slice(4, -1).split(",").map(Number);

  return left! * right!;
}
