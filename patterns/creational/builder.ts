/**
 * final Person person1 = new Person.PersonBuilder(
   new FullName.FullNameBuilder(
      new Name("Dynamite"), new Name("Napoleon")).createFullName(),
   new Address.AddressBuilder(
      new City("Preston"), State.ID).createAddress()).createPerson();

final Person person2 = new Person.PersonBuilder(
   new FullName.FullNameBuilder(
      new Name("Coltrane"), new Name("Rosco")).middleName(new Name("Purvis")).createFullName(),
   new Address.AddressBuilder(
      new City("Hazzard"), State.GA).createAddress())
      .gender(Gender.MALE).employment(EmploymentStatus.EMPLOYED).createPerson();
 */
// class Builder<T extends {}> {
//   constructor (T) {}
// }
// class Person {
//   constructor() {}
// }
// class FullName{}

// class Name {}

//   class PersonBuilder {}
type RequireOnly<TObj, ParticularK extends keyof TObj> = Pick<
  TObj,
  ParticularK
> &
  Partial<Omit<TObj, ParticularK>>;

class ObjectBuilder {
  public static new<Target>(): IWith<Target, {}> {
    return new Builder<Target, {}>({});
  }
}

interface IWith<Target, Supplied> {
  with<T extends Omit<Target, keyof Supplied>, K extends keyof T>(
    key: K,
    value: T[K]
  ): keyof Omit<Omit<Target, keyof Supplied>, K> extends never
    ? IBuild<Target>
    : IWith<Target, Supplied & Pick<T, K>>;
}

interface IBuild<Target> {
  build(): Target;
}

class Builder<Target, Supplied>
  implements IBuild<Target>, IWith<Target, Supplied>
{
  constructor(private target: Partial<Target>) {}

  with<T extends Omit<Target, keyof Supplied>, K extends keyof T>(
    key: K,
    value: T[K]
  ) {
    const target: Partial<Target> = { ...this.target, [key]: value };
    return new Builder<Target, Supplied & Pick<T, K>>(target);
  }

  build() {
    return this.target as Target;
  }
}
