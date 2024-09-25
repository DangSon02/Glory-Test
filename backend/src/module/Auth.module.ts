import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from 'src/controller/Auth.controller';
import { UserController } from 'src/controller/User.controller';
import { User } from 'src/model/User.entity';
import { RefreshTokenRepository } from 'src/repository/refreshToken.repository';
import { UserRepository } from 'src/repository/user.repository';
import { AuthService } from 'src/service/impl/Auth.service.impl';
import { UserService } from 'src/service/impl/User.service.impl';
import { AuthUtils } from 'src/util/AuthUtil';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule.register({
      global: true,
      secret: process.env.SECRETKEY,
      signOptions: { expiresIn: '1h' },
    }),
  ],
  providers: [
    UserRepository,
    RefreshTokenRepository,
    AuthUtils,
    { provide: 'AuthServiceInterface', useClass: AuthService },
    { provide: 'UserServiceInterface', useClass: UserService },
  ],
  controllers: [AuthController, UserController],
})
export class AuthModule {}
