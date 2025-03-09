import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { TaskService } from './service';
import { SearchTaskDto } from './dto/search.task.dto';
import { PageDto } from 'src/common/dto/page.dto';
import { TaskPage } from './dto/response.dto';
import { CreateTaskDto } from './dto/create.task.dto';
import { ManyTaskDto } from './dto/many.task.dto';
import { UpdateTaskDto } from './dto/update.task.dto';

@Controller('/tasks')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Get()
  getAll(
    @Query() pageDto: PageDto,
    @Query() searchDto: SearchTaskDto,
  ): Promise<TaskPage> {
    return this.taskService.getAll(pageDto, searchDto);
  }

  @Post()
  add(@Body() createDto: CreateTaskDto) {
    return this.taskService.add(createDto);
  }

  @Patch('/updateMany')
  updateMany(@Body() updateMany: ManyTaskDto) {
    return this.taskService.updateMany(updateMany);
  }

  @Patch('/:id')
  update(@Param('id') id: number, @Body() updateDto: UpdateTaskDto) {
    return this.taskService.update(id, updateDto);
  }

  @Delete('/deleteMany')
  deleteMany(@Body() manyDto: ManyTaskDto) {
    return this.taskService.deleteMany(manyDto);
  }

  @Delete('/:id')
  delete(@Param('id') id: number) {
    return this.taskService.delete(id);
  }
}
