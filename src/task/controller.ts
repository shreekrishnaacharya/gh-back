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

@Controller('/task')
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
    return this.add(createDto);
  }

  @Patch('/:id')
  update(@Param('id') id: number, @Body() updateDto: CreateTaskDto) {
    return this.update(id, updateDto);
  }

  @Delete('/:id')
  delete(@Param('id') id: number) {
    return this.delete(id);
  }
}
