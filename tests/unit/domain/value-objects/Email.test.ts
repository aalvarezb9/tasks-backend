import { Email } from '../../../../src/domain/value-objects/Email';

describe('Email VO', () => {
  it('creates lowercase email', () => {
    const email = Email.create('USER@Example.COM');
    expect(email.value).toBe('user@example.com');
  });

  it('throws on invalid email', () => {
    expect(() => Email.create('invalid')).toThrow('Invalid email');
  });
});
