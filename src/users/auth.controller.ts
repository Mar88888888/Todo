import { BadRequestException, Body, Controller, Post } from '@nestjs/common';
import { SignupDto } from './dto/signup.dto';
import { UsersService } from './users.service';
import { LoginDto } from './dto/login.dto';
import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { UserEntity } from './user.entity';

@Controller('auth')
export class AuthController {

  constructor(private usersService: UsersService) {}

  @ApiOperation({ summary: 'Log In', description: 'Get JWT access token after successfull login' })
  @ApiBody({ type: LoginDto })
  @ApiResponse({ status: 200,
    example: { token: "*accessToken*" }})
    @Post('/login')
    async login(@Body() loginData: LoginDto) {
      const user = await this.usersService.findByEmail(loginData.email);
      if (!user) {
        throw new BadRequestException('User with this email not found');
      }
      const token = await this.usersService.login(loginData, user);
      return { token };
    }
    
    
  @ApiOperation({ summary: 'Sign Up', description: 'Create an account' })
  @ApiBody({ type: SignupDto })
  @ApiResponse({ status: 201, type: UserEntity})
  @Post('/signup')
  async signup(@Body() userData: SignupDto) {
    const user = await this.usersService.findByEmail(userData.email);
    if (user) {
      throw new BadRequestException('User with this email already exists');
    }
    const newUser = this.usersService.create(userData);
    return newUser;
  }
}
