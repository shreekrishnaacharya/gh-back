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
import { PageDto } from '../common/dto/page.dto';
import { ResponseTaskDto, TaskPage } from './dto/response.dto';
import { CreateTaskDto } from './dto/create.task.dto';
import { ManyTaskDto } from './dto/many.task.dto';
import { UpdateTaskDto } from './dto/update.task.dto';
import { ResponseMessage } from '../common/dto/message.dto';
import { ResponseStatusEnum } from '../common/enum/common.enum';

@Controller('/tasks')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Get()
  getAll(
    @Query() searchDto?: SearchTaskDto,
    @Query() pageDto?: PageDto,
  ): Promise<TaskPage> {
    return this.taskService.getAll(pageDto, searchDto);
  }

  @Get('/:id')
  getOne(
    @Param('id') id: number,
    @Query() searchDto?: SearchTaskDto,
  ): Promise<ResponseTaskDto> {
    return this.taskService.getById(id, searchDto);
  }

  @Post()
  add(@Body() createDto: CreateTaskDto) {
    return this.taskService.add(createDto);
  }

  @Patch('/updateMany')
  async updateMany(@Body() updateMany: ManyTaskDto): Promise<ResponseMessage> {
    await this.taskService.updateMany(updateMany);
    return {
      message: 'Update many success',
      status: ResponseStatusEnum.SUCCESS,
    };
  }

  @Patch('/:id')
  update(@Param('id') id: number, @Body() updateDto: UpdateTaskDto) {
    return this.taskService.update(id, updateDto);
  }

  @Delete('/deleteMany')
  async deleteMany(@Body() manyDto: ManyTaskDto): Promise<ResponseMessage> {
    await this.taskService.deleteMany(manyDto);
    return {
      message: 'Delete many success',
      status: ResponseStatusEnum.SUCCESS,
    };
  }

  @Delete('/:id')
  async delete(@Param('id') id: number): Promise<ResponseMessage> {
    await this.taskService.delete(id);
    return {
      message: 'Delete success',
      status: ResponseStatusEnum.SUCCESS,
    };
  }
}
