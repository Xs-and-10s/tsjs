interface SumWithDescription {
  (a: number, b: number): number;
  description: string;
}

const sum: SumWithDescription = function (a, b) {
  return a + b;
};
sum.description = "A function that sums two numbers";
