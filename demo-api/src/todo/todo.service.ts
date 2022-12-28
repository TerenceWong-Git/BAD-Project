import { CreateTodo } from './todo.dto';
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class TodoService {
  constructor(private prisma: PrismaService) {}

  getTodo() {
    return this.prisma.todo.findMany({
      select: {
        id: true,
        name: true,
        description: true,
      },
    });
  }

  async createTodo(createTodo: CreateTodo) {
    console.log(createTodo);
    const user = await this.prisma.todo.create({
      data: { ...createTodo },
      select: { id: true, name: true, description: true },
    });
    return user;
  }
}
