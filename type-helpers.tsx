export type ValuesOf<TObj> = TObj[keyof TObj];

export type ExtractKeysThatAreStrings<TObj> = {
  [K in keyof TObj]: TObj[K] extends string ? K : never;
}[keyof TObj];

export type ExtractStringKeys<TObj> = ValuesOf<{
  [K in keyof TObj]: TObj[K] extends string ? K : never;
}>;

export type ExtractKeysWhereValuesAreOfType<TObj, TCondition> = ValuesOf<{
  [K in keyof TObj]: TObj[K] extends TCondition ? K : never;
}>;

export type DiscriminatedUnionOfTypesFromKeys<TObj> = {
  [K in keyof TObj]: {
    type: K;
  };
}[keyof TObj];
// ...

export type RequireOnly<TObj, ParticularK extends keyof TObj> = Pick<
  TObj,
  ParticularK
> &
  Partial<Omit<TObj, ParticularK>>;

// ...

const roles = ["user", "superadmin", "admin"] as const;

type RolesArray = typeof roles;

type RolesByNumberUnion = RolesArray[0 | 1 | 2];

type RolesUnion = RolesArray[number];

// ...

type EverythingIsAssignableToMe = {} | null | undefined;
type Unknown = {} | null | undefined;

// ...

const props: { params?: { id: string | undefined } } = {
  params: { id: undefined },
};
const id = props.params?.id;

const raise = (err: string): never => {
  throw new Error(err);
};
id ?? raise("id is required");

const redirect = (url: string): never => {
  window.location.href = url;
  return {} as never;
};
id ?? redirect("/");

// ...

type IconType =
  | "application"
  | "settings"
  | "user"
  | "trash"
  | "rain"
  | (string & {}); // this allows autocomplete!!
type IconProps = {
  icon: IconType;
};
const Icon = (props: IconProps) => {
  return null;
};
<>
  <Icon icon="now-I-get-autocomplete!" />
</>;

// ...
