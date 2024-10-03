function dc() {
  return (left: string) => {
    return (right: string) => {
      return `${left}, ${right}!`;
    };
  };
}
const tmpl = dc();
const result = tmpl("hello")("world");
console.log(result); // hello, world!
