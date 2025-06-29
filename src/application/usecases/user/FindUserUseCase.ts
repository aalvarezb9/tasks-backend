import { inject, injectable } from 'tsyringe';
import { UserRepository } from '../../../domain/repositories/UserRepository';
import { Email } from '../../../domain/value-objects/Email';
import { UserDTO } from '../../dtos/UserDTO';

@injectable()
export class FindUserUseCase {
  constructor(@inject('UserRepository') private readonly repo: UserRepository) {}

  async execute(q: { email: string }): Promise<UserDTO | null> {
    const user = await this.repo.findByEmail(Email.create(q.email));
    return user
      ? {
          id: user.id.value,
          email: user.email.value,
          name: user.name,
          createdAt: user.createdAt.toISOString(),
          password: user.password().value(),
        }
      : null;
  }
}
