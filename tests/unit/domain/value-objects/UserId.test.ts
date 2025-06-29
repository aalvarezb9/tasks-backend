import { UserId } from '../../../../src/domain/value-objects/UserId';

describe('UserId', () => {
  it('creates uuid', () => {
    expect(UserId.create().value).toHaveLength(36);
  });

  it('from keeps value', () => {
    const id = UserId.from('123');
    expect(id.value).toBe('123');
  });
});
