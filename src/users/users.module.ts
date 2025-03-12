import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './user.entity';
require('dotenv').config();

@Module({
  imports: [JwtModule.register({
    secret: process.env.JWT_SECRET,
    signOptions: { expiresIn: '1d' }
  }), TypeOrmModule.forFeature([UserEntity])],
  providers: [UsersService],
  controllers: [UsersController, AuthController],
  exports: [UsersService]
})
export class UsersModule {}
