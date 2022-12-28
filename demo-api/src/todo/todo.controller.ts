import { TodoService } from './todo.service';
import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateTodo } from './todo.dto';

@Controller('todo')
export class TodoController {
  constructor(private todoService: TodoService) {}

  @Get()
  getTodo() {
    return this.todoService.getTodo();
  }

  @Post()
  createTodo(@Body() createTodo: CreateTodo) {
    return this.todoService.createTodo(createTodo);
  }
}
