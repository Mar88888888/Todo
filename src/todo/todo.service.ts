import { Injectable } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { TodoEntity } from './todo.entity';
import { Repository } from 'typeorm';
import { UserEntity } from 'src/users/user.entity';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { Status } from './todo-status.enum';

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(TodoEntity)
    private todoRepository: Repository<TodoEntity>,
  ){}
  
  async create(todoData: CreateTodoDto, user: UserEntity) {
    let newTodo = this.todoRepository.create(todoData);
    newTodo.user = user;
    newTodo.status = Status.PENDING;
    return this.todoRepository.save(newTodo);
  }

  async findOne(id: number) {
    return this.todoRepository.findOne({ where: { id }, relations: ['user'] });
  }

  async findAll(user: UserEntity, page: number = 1, limit: number = 10) {
    const skip = (page - 1) * limit;

    const [todos, total] = await this.todoRepository.findAndCount({
      where: { user },
      relations: ['user'],
      skip,
      take: limit,
    });

    return {
      data: todos,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      }
    };
  }


  async update(id: number, todoData: UpdateTodoDto) {
    await this.todoRepository.update({id}, todoData);
    return this.findOne(id);
  }


  async delete(id: number) {
    return this.todoRepository.delete({id});
  }
}
