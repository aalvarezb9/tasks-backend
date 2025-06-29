export class Email {
  private constructor(public readonly value: string) {}

  static create(val: string) {
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(val)) throw new Error('Invalid email');
    return new Email(val.toLowerCase());
  }
}
