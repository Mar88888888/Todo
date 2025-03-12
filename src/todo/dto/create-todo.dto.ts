import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateTodoDto {
  
  @ApiProperty({
    description: 'The task title',
    example: 'Learn NestJS',
  })
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty({
    description: 'The task description',
    example: 'Master using guards and interceptors',
  })
  @IsOptional()
  @IsString()
  description: string;
}