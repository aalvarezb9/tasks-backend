export class Result<T> {
  private constructor(
    private readonly v: T | null,
    private readonly e?: string
  ) {}

  static ok<U>(v: U): Result<U> {
    return new Result(v);
  }

  static fail<U>(e: string): Result<U> {
    return new Result<U>(null, e);
  }

  isSuccess() {
    return !!this.v && !this.e;
  }

  value() {
    if (!this.v) throw new Error('No value');
    return this.v;
  }

  error() {
    return this.e;
  }
}
