import { UserDTO } from '../../../../src/application/dtos/UserDTO';

describe('UserDTO definition', () => {
  it('can be instantiated', () => {
    const dto: UserDTO = {
      id: '1',
      password: 'secret',
      email: 'a@b.com',
      name: 'A',
      createdAt: new Date().toISOString(),
    };
    expect(dto.id).toBe('1');
    expect(dto.password).toBe('secret');
    expect(dto.email).toBe('a@b.com');
    expect(dto.name).toBe('A');
    expect(typeof dto.createdAt).toBe('string');
  });
});
