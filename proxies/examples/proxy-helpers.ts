export const property = {
  isAString(prop: string | symbol): prop is string {
    return typeof prop === "string";
  },
  isASymbol(prop: string | symbol): prop is symbol {
    return typeof prop === "symbol";
  },
};
