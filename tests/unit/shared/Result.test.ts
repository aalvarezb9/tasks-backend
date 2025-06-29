import { Result } from '../../../src/shared/core/Result';

describe('Result<T>', () => {
  it('ok holds value', () => {
    const r = Result.ok(123);
    expect(r.isSuccess()).toBe(true);
    expect(r.value()).toBe(123);
  });

  it('fail exposes error', () => {
    const r = Result.fail<number>('boom');
    expect(r.isSuccess()).toBe(false);
    expect(r.error()).toBe('boom');
    expect(() => r.value()).toThrow('No value');
  });
});
