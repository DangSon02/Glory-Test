import { Injectable } from '@nestjs/common';
import { UserRepository } from 'src/repository/user.repository';
import { UserServiceInterface } from '../User.service';

@Injectable()
export class UserService implements UserServiceInterface {
  constructor(private readonly userRepository: UserRepository) {}

  async getUserInfo(userId: number): Promise<any> {
    return await this.userRepository.findUserById(userId);
  }
}
