const nullIfPropNotFound = new Proxy(
  {},
  {
    get(obj, prop) {
      return prop in obj ? obj[prop] : null;
    },
  }
);
