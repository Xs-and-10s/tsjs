const roles = ["user", "admin", "superadmin"] as const;

type RoleAttempt1 = typeof roles;
//   ^?

type RoleAttempt2 = (typeof roles)[0 | 1 | 2];
//   ^?

type Roles = (typeof roles)[number];
//   ^?
