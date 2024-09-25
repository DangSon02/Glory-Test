import {
  Body,
  Controller,
  HttpStatus,
  Inject,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { LoginRequest } from 'src/dto/requestDTO/LoginRequestDTO';
import { SignInRequest } from 'src/dto/requestDTO/SignInRequestDTO';
import { ErrorResponse } from 'src/exception/ErrorResponse';
import { ResponseData } from 'src/exception/ResponseData';
import { AuthServiceInterface } from 'src/service/Auth.service';
import { AuthGuard } from 'src/util/Auth.guard';

@Controller('auth')
export class AuthController {
  constructor(
    @Inject('AuthServiceInterface')
    private readonly authService: AuthServiceInterface,
  ) {}

  @Post('sign-in')
  async register(@Body() request: SignInRequest): Promise<ResponseData<any>> {
    try {
      const user = await this.authService.signIn(request);

      return new ResponseData<any>(
        HttpStatus.CREATED,
        'User registered successfully',
        user,
      );
    } catch (error) {
      return new ErrorResponse<any>(
        HttpStatus.BAD_REQUEST,
        'Registration failed',
      );
    }
  }

  @Post('login')
  async login(@Body() request: LoginRequest): Promise<ResponseData<any>> {
    try {
      const data = await this.authService.login(request);

      return new ResponseData<any>(
        HttpStatus.OK,
        'User login successfully',
        data,
      );
    } catch (error) {
      return new ErrorResponse<any>(HttpStatus.BAD_REQUEST, 'Login failed');
    }
  }

  @Put('sign-out')
  @UseGuards(AuthGuard)
  async logout(@Req() req: any): Promise<ResponseData<any>> {
    try {
      const data = await this.authService.logout(
        req.body.refreshToken,
        req.user.id,
      );

      return new ResponseData<any>(
        HttpStatus.OK,
        'User logout successfully',
        data,
      );
    } catch (error) {
      return new ErrorResponse<any>(HttpStatus.BAD_REQUEST, 'Logout failed');
    }
  }

  @Put('refresh-token')
  async refreshToken(@Body() body): Promise<any> {
    return await this.authService.refreshToken(body.refreshToken);
  }
}
