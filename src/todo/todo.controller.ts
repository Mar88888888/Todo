import { BadRequestException, Body, Controller, Delete, ForbiddenException, Get, HttpCode, 
  NotFoundException, Param, Patch, Post, Query, Req, UseGuards} from '@nestjs/common';
import { AuthGuard } from '../guards/auth.guard';
import { TodoService } from './todo.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { isValidStatus } from './todo-status.enum';
import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { TodoEntity } from './todo.entity';

@UseGuards(AuthGuard)
@Controller('todo')
export class TodoController {
  constructor(
    private todoService: TodoService,
  ) {}

  @ApiOperation({ summary: 'Get user todos' })
  @ApiResponse({ status: 200, description: 'List of todos', type: [TodoEntity] })
  @Get('/')
  async getUserTodos(
    @Req() req,
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10
  ) {
    return this.todoService.findAll(req.user, Number(page), Number(limit));
  }

  @ApiOperation({ summary: 'Create a new todo' })
  @ApiBody({ type: CreateTodoDto })
  @ApiResponse({ status: 201, description: 'Created todo', type: TodoEntity })
  @Post('/')
  async createTodo(@Req() req, @Body() todoData: CreateTodoDto) {
    return this.todoService.create(todoData, req.user);
  }

  @ApiOperation({ summary: 'Update a todo' })
  @ApiBody({ type: UpdateTodoDto })
  @ApiResponse({ status: 200, description: 'Updated todo', type: TodoEntity })
  @Patch('/:id')
  async updateTodo(
    @Param('id') todoId: number, 
    @Body() todoData: UpdateTodoDto, 
    @Req() req
  ) {
    const todo = await this.todoService.findOne(todoId);
    
    if (!todo) {
      throw new NotFoundException('Todo not found');
    }

    if (todoData.status && !isValidStatus(todoData.status)) {
      throw new BadRequestException('Invalid status');
    }

    if (todo.user.id !== req.user.id) {
      throw new ForbiddenException('You are not allowed to update this todo'); 
    }

    return this.todoService.update(todo.id, todoData);
  }

  @ApiOperation({ summary: 'Delete a todo' })
  @Delete('/:id')
  @HttpCode(204) 
  async deleteTodo(@Param('id') todoId: number, @Req() req) {
    const todo = await this.todoService.findOne(todoId);
    
    if (!todo) {
      return; 
    }

    if (todo.user.id !== req.user.id) {
      throw new ForbiddenException('You are not allowed to delete this todo'); 
    }

    await this.todoService.delete(todo.id);
    return;
  }
}
