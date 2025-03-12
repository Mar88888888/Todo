import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthGuard } from '../guards/auth.guard';
import { UserEntity } from './user.entity';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}
  
  @ApiOperation({ summary: 'Get user info', description: 'Get current logged in user information by JWT auth token' })
  @ApiResponse({ status: 200, type: UserEntity})
  @UseGuards(AuthGuard)
  @Get('/me')
  async getMe(@Req() req: any) {
    return req.user;
  }

  
}
