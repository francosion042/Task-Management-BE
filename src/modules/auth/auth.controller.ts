import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { Request } from 'express';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { UserRegisterDto } from './dto/user-register.dto';
import { UserService } from '../user/user.service';
import { BaseResponseDto } from '../../common/dto/base-response.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private userService: UserService,
  ) {}

  @Post('register')
  async register(@Body() userRegisterDto: UserRegisterDto) {
    const user = await this.userService.create(userRegisterDto);

    const token = await this.authService.createToken(user);

    return new BaseResponseDto(201, 'User Registration Successful', {
      token,
      user,
    });
  }
  @Post('login')
  @UseGuards(LocalAuthGuard)
  @HttpCode(HttpStatus.OK)
  async login(@Req() request: Request) {
    // console.log(request.user);
    const token = await this.authService.createToken(request.user);

    return new BaseResponseDto(200, 'User Login Successful', {
      token,
      user: request.user,
    });
  }
}
