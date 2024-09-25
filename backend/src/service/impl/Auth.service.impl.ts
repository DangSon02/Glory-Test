import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { LoginRequest } from 'src/dto/requestDTO/LoginRequestDTO';
import { SignInRequest } from 'src/dto/requestDTO/SignInRequestDTO';
import { RefreshToken } from 'src/model/RefreshToken.entity';
import { User } from 'src/model/User.entity';
import { RefreshTokenRepository } from 'src/repository/refreshToken.repository';
import { UserRepository } from 'src/repository/user.repository';
import { AuthUtils } from 'src/util/AuthUtil';
import { AuthServiceInterface } from '../Auth.service';

@Injectable()
export class AuthService implements AuthServiceInterface {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly authUtil: AuthUtils,
    private readonly refreshTokenRepository: RefreshTokenRepository,
    private readonly jwtService: JwtService,
  ) {}

  // Dang Xuat
  async logout(refreshToken: string, userId: number): Promise<void> {
    try {
      // Tìm refresh token trong cơ sở dữ liệu
      const token = await this.refreshTokenRepository.findByToken(
        refreshToken,
        userId,
      );

      if (!token) {
        throw new UnauthorizedException('Refresh token không hợp lệ');
      }

      // Xóa refresh token khỏi cơ sở dữ liệu
      return await this.refreshTokenRepository.deleteToken(token.refreshToken);
    } catch (error) {
      throw new UnauthorizedException(
        'Access token hoặc refresh token không hợp lệ',
      );
    }
  }

  // Dang Nhap
  async login(request: LoginRequest): Promise<any> {
    const user = await this.userRepository.findUserByPhone(request.phone);

    if (!user) {
      throw new BadRequestException('Phone is not exist!');
    }

    const checkPassword = await bcrypt.compare(request.password, user.password);

    if (!checkPassword) {
      throw new BadRequestException('Password is not correct!');
    }

    const payload = { id: user.id, phone: user.phone };

    const jwt = await this.authUtil.createTokenPair(payload);

    // const refreshToken = jwt.refreshToken;
    await this.createRefreshToken(user, jwt.refreshToken);

    return jwt;
  }

  //Dang Ky
  async signIn(request: SignInRequest): Promise<any> {
    const hashPassword = await this.hashPassword(request.password);

    const user = new User();
    user.firstName = request.firstName;
    user.lastName = request.lastName;
    user.phone = request.phone;
    user.password = hashPassword;

    return await this.userRepository.createUser(user);
  }

  private async hashPassword(password: string): Promise<string> {
    const hashPassword = await bcrypt.hash(password, 10);
    return hashPassword;
  }

  async createRefreshToken(
    user: User,
    refreshToken: string,
  ): Promise<RefreshToken> {
    return await this.refreshTokenRepository.createRefreshToken(
      user,
      refreshToken,
    );
  }

  async refreshToken(refreshToken: string): Promise<any> {
    try {
      const isRefrehToken =
        await this.refreshTokenRepository.findByToken(refreshToken);

      const user =
        await this.refreshTokenRepository.findUserByRefreshToken(refreshToken);

      console.log('user::', user);

      if (isRefrehToken) {
        return await this.authUtil.createTokenPair({
          id: user.id,
          phone: user.user.phone,
        });
      } else {
        throw new BadRequestException('Refreh Token is not valid');
      }
    } catch (error) {
      throw new BadRequestException('Refreh Token is not valid');
    }
  }
}
