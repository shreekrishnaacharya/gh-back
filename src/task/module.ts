import { Module } from '@nestjs/common';
import { TaskController } from './controller';
import { TaskService } from './service';

@Module({
  imports: [],
  controllers: [TaskController],
  providers: [TaskService],
})
export class TaskModule {}
