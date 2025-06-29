import bcrypt from 'bcryptjs';

export class Password {
  private constructor(private readonly hashed: string) {}

  static async hash(plain: string): Promise<Password> {
    const hashed = await bcrypt.hash(plain, 10);
    return new Password(hashed);
  }

  static fromHashed(hash: string): Password {
    return new Password(hash);
  }

  compare(plain: string): Promise<boolean> {
    return bcrypt.compare(plain, this.hashed);
  }

  value(): string {
    return this.hashed;
  }
}
