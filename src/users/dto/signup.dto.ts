import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, MinLength, IsEmail } from 'class-validator';

export class SignupDto {

    @ApiProperty({
        description: 'User name',
        example: 'John Doe',
      })
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiProperty({
    description: 'User password',
    example: 'password',
    })
    @IsString()
    @IsNotEmpty()
    @MinLength(6)
    password: string;

    @ApiProperty({
        description: 'User email',
        example: 'email@examle.com',
      })
    @IsString()
    @IsNotEmpty()
    @IsEmail()
    email: string;
}
