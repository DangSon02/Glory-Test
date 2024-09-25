import { Injectable } from '@nestjs/common';
import { RefreshToken } from 'src/model/RefreshToken.entity';
import { User } from 'src/model/User.entity';

import { DataSource, Repository } from 'typeorm';

@Injectable()
export class RefreshTokenRepository {
  private refreshTokenRepo: Repository<RefreshToken>;

  constructor(private readonly dataSource: DataSource) {
    this.refreshTokenRepo = this.dataSource.getRepository(RefreshToken);
  }

  async createRefreshToken(
    user: User,
    refreshToken: string,
  ): Promise<RefreshToken> {
    return await this.refreshTokenRepo.save({ user, refreshToken });
  }

  async findByToken(
    refreshToken: string,
    userId?: number,
  ): Promise<RefreshToken> {
    return this.refreshTokenRepo.findOne({
      where: {
        refreshToken,
        ...(userId && { user: { id: userId } }),
      },
    });
  }

  async deleteToken(refreshToken: string): Promise<void> {
    await this.refreshTokenRepo.delete({ refreshToken });
  }

  async findUserByRefreshToken(refreshToken: string): Promise<RefreshToken> {
    return await this.refreshTokenRepo.findOne({
      where: { refreshToken },
      relations: { user: true },
    });
  }
}
