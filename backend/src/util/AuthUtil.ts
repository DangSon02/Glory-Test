import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as dotenv from 'dotenv';
dotenv.config();

@Injectable()
export class AuthUtils {
  constructor(private readonly jwtService: JwtService) {}

  async createTokenPair(payload: { id: number; phone: string }): Promise<any> {
    const accessToken = await this.jwtService.signAsync(payload);
    const refreshToken = await this.jwtService.signAsync(payload, {
      secret: process.env.SECRETKEY,
      expiresIn: '1d',
    });

    return { accessToken, refreshToken };
  }
}
