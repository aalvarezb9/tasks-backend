import { inject, injectable } from 'tsyringe';
import { UserRepository } from '../../../domain/repositories/UserRepository';
import { LoginUserCommand } from '../../commands/LoginUserCommand';
import { Email } from '../../../domain/value-objects/Email';
import jwt from 'jsonwebtoken';
import { env } from '../../../config/env';

@injectable()
export class LoginUserUseCase {
  constructor(@inject('UserRepository') private readonly repo: UserRepository) {}

  async execute(cmd: LoginUserCommand): Promise<{ token: string }> {
    const emailVO = Email.create(cmd.email);
    const user = await this.repo.findByEmail(emailVO);
    if (!user || !(await user.checkPassword(cmd.password))) {
      throw new Error('Invalid credentials');
    }

    const token = jwt.sign({ sub: user.id.value, email: user.email.value }, env.jwtSecret, {
      expiresIn: '5h',
    });

    return { token };
  }
}
