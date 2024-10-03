export const composeM =
  (chainMethod) =>
  (...ms) =>
    ms.reduce((f, g) => (x) => g(x)[chainMethod](f));

const composePromises = composeM("then");
const label = "API call composition";

// a => Promise(b)
const getUserById = (id) =>
  id === 3 ? Promise.resolve({ name: "Mark", role: "Author" }) : undefined;

// b => Promise(c)
const hasPermission = ({ role }) => Promise.resolve(role === "Author");

// compose the functions!
const authUser = composePromises(hasPermission, getUserById);
authUser(3).then(console.trace(label)); // true
