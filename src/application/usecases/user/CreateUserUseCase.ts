import { inject, injectable } from 'tsyringe';
import { UserRepository } from '../../../domain/repositories/UserRepository';
import { UserDTO } from '../../dtos/UserDTO';
import { Email } from '../../../domain/value-objects/Email';
import { User } from '../../../domain/entities/User';

@injectable()
export class CreateUserUseCase {
  constructor(@inject('UserRepository') private readonly repo: UserRepository) {}

  async execute(dto: { email: string; name: string; password: string }): Promise<UserDTO> {
    const email = Email.create(dto.email);
    const existing = await this.repo.findByEmail(email);
    if (existing) return toDTO(existing);

    const user = await User.register(email, dto.password, { name: dto.name });
    await this.repo.save(user);
    return toDTO(user);
  }
}

const toDTO = (u: User): UserDTO => ({
  id: u.id.value,
  email: u.email.value,
  password: u.password().value(),
  name: u.name,
  createdAt: u.createdAt.toISOString(),
});
