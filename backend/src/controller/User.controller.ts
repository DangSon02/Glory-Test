import {
  Controller,
  Get,
  HttpStatus,
  Inject,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ErrorResponse } from 'src/exception/ErrorResponse';
import { ResponseData } from 'src/exception/ResponseData';
import { UserServiceInterface } from 'src/service/User.service';
import { AuthGuard } from 'src/util/Auth.guard';

@Controller('user')
export class UserController {
  constructor(
    @Inject('UserServiceInterface')
    private readonly userService: UserServiceInterface,
  ) {}

  @Get('user-information')
  @UseGuards(AuthGuard)
  async logout(@Req() req: any): Promise<ResponseData<any>> {
    console.log('id::', req.user.id);
    try {
      const data = await this.userService.getUserInfo(req.user.id);

      return new ResponseData<any>(
        HttpStatus.OK,
        'User logout successfully',
        data,
      );
    } catch (error) {
      return new ErrorResponse<any>(HttpStatus.BAD_REQUEST, 'Logout failed');
    }
  }
}
