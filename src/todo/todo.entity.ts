import { UserEntity } from "src/users/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Status } from "./todo-status.enum";
import { ApiProperty } from "@nestjs/swagger";

@Entity({name: 'todos'})
export class TodoEntity {
  @ApiProperty({
    description: 'Todo ID',
    example: 365,
  })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
      description: 'The task title',
      example: 'Learn NestJS',
    })
  @Column({nullable: false})
  title: string;


  @ApiProperty({
    description: 'The task description',
    example: 'Master using guards and interceptors',
  })
  @Column({nullable: true})
  description: string;


  @ApiProperty({
    description: 'The status of the todo',
    enum: Status,
    example: Status.PENDING,
  })
  @Column({ type: 'enum', enum: Status, default: Status.PENDING })
  status: Status;

  @ManyToOne(() => UserEntity, user => user.todos)
  user: UserEntity;
}