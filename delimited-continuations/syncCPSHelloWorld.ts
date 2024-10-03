function cps(cont: (s: string) => void) {
  return (left: string) => {
    return (right: string) => {
      cont(`${left}, ${right}!`);
    };
  };
}
const tmpl = cps((result) => {
  console.log(result);
});
tmpl("hello")("world"); // hello, world!
