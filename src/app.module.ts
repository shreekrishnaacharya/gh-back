import { Module } from '@nestjs/common';
import { TaskModule } from './task/module';
import { DatabaseModule } from './database.module';

@Module({
  imports: [TaskModule, DatabaseModule],
})
export class AppModule {}
