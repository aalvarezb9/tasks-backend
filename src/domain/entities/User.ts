import { UserId } from '../value-objects/UserId';
import { Email } from '../value-objects/Email';
import { Password } from '../value-objects/Password';

export interface UserProps {
  name: string;
}

export class User {
  private constructor(
    public readonly id: UserId,
    public readonly email: Email,
    private _password: Password,
    private props: UserProps,
    private _createdAt: Date
  ) {}

  static async register(email: Email, plainPassword: string, props: UserProps) {
    const hashed = await Password.hash(plainPassword);
    return new User(UserId.create(), email, hashed, props, new Date());
  }

  static hydrate(
    id: string,
    email: string,
    hashed: string,
    props: UserProps,
    createdAt: string | Date
  ) {
    return new User(
      UserId.from(id),
      Email.create(email),
      Password.fromHashed(hashed),
      props,
      typeof createdAt === 'string' ? new Date(createdAt) : createdAt
    );
  }

  password() {
    return this._password;
  }

  checkPassword(plain: string) {
    return this._password.compare(plain);
  }

  get name() {
    return this.props.name;
  }

  get createdAt() {
    return this._createdAt;
  }
}
