import { Exclude } from 'class-transformer';
import { TodoEntity } from '../todo/todo.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity({name: 'users'})
export class UserEntity{
  @ApiProperty({
    description: 'User ID',
    example: 365,
  })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    description: 'User name',
    example: 'John',
  })
  @Column({nullable: false})
  name: string;

  @ApiProperty({
    description: 'User email',
    example: 'test@example.com',
  })
  @Column({nullable: false, unique: true})
  email: string;

  @Column({nullable: false})
  @Exclude()
  password: string;

  @OneToMany(() => TodoEntity, todo => todo.user)
  todos: TodoEntity[];
}