import { User } from '../../../../src/domain/entities/User';
import { Email } from '../../../../src/domain/value-objects/Email';

describe('User', () => {
  it('register + checkPassword', async () => {
    const u = await User.register(Email.create('a@b.com'), 'secret', { name: 'A' });
    expect(await u.checkPassword('secret')).toBe(true);
    expect(await u.checkPassword('no')).toBe(false);
  });
});
