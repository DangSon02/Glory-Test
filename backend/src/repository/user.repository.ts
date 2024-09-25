import { Injectable } from '@nestjs/common';
import { User } from 'src/model/User.entity';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class UserRepository {
  private userRepo: Repository<User>;

  constructor(private readonly dataSource: DataSource) {
    this.userRepo = this.dataSource.getRepository(User);
  }

  async createUser(user: User): Promise<User> {
    return await this.userRepo.save(user);
  }

  async findUserByPhone(phone: string): Promise<User> {
    return this.userRepo.findOne({ where: { phone: phone } });
  }

  async findUserById(userId: number): Promise<User> {
    return this.userRepo.findOne({ where: { id: userId } });
  }
}
