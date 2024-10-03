import { property } from "./proxy-helpers";

const range = (min: number, max: number) =>
  new Proxy(
    {},
    {
      has(target, p) {
        if (property.isAString(p)) {
          return +p >= min && +p <= max;
        }
        return false;
      },
    }
  );
// function propertyIsAString(prop: string | symbol): prop is string {
//   return typeof prop === "string";
// }

const X = 10.5;
const nums = [1, 5, X, 50, 100];
if (X in range(1, 100)) {
  // do something
}
nums.filter((n) => n in range(1, 10)); // [1, 5]
