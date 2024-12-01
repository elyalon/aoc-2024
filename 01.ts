import _ from "lodash";

const input = await Bun.file("./input.txt").text();

const leftList: number[] = [];
const rightList: number[] = [];

input
  .split("\n")
  .map((line) => line.split("   "))
  .forEach(([left, right]) => {
    leftList.push(Number(left!));
    rightList.push(Number(right!));
  });

leftList.sort();
rightList.sort();

let sum = 0;

for (let i = 0; i < leftList.length; i++) {
  const left = leftList[i]!;
  const right = rightList[i]!;

  sum += Math.abs(left - right);
}

console.log(sum);
