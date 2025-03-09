import { Module } from '@nestjs/common';
import { TaskController } from './controller';
import { TaskService } from './service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from '../entities/task.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Task])],
  controllers: [TaskController],
  providers: [TaskService],
  exports: [TaskService],
})
export class TaskModule {}
