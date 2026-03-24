import { Module } from '@nestjs/common';
import { AiModule } from './ai/ai.module';
import { PrismaModule } from './prisma/prisma.module';
import { TasksModule } from './tasks/tasks.module';

@Module({
  imports: [PrismaModule, TasksModule, AiModule],
})
export class AppModule {}
