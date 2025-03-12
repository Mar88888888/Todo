import { IsOptional, IsString } from "class-validator";
import { Status } from "../todo-status.enum";
import { CreateTodoDto } from "./create-todo.dto";
import { ApiProperty, PartialType } from "@nestjs/swagger";

export class UpdateTodoDto extends PartialType(CreateTodoDto) {
  @ApiProperty({
    description: 'The status of the todo',
    enum: Status,
    example: Status.PENDING,
  })
  @IsOptional()
  @IsString()
  status: Status;
}