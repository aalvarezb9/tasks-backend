import { Password } from '../../../../src/domain/value-objects/Password';

describe('Password VO', () => {
  it('hash & compare', async () => {
    const pw = await Password.hash('secret');
    expect(await pw.compare('secret')).toBe(true);
    expect(await pw.compare('nope')).toBe(false);
  });
});
