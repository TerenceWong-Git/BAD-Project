import { Module } from '@nestjs/common';
import { TodoModule } from './todo/todo.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [TodoModule, PrismaModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
