import { Injectable, NotFoundException } from '@nestjs/common';
import { findAllByPage, Page } from '@sksharma72000/nestjs-search-page';
import { PageDto } from 'src/common/dto/page.dto';
import { Task } from 'src/entities/task.entity';
import { FindOneOptions, FindOptions, In, Repository } from 'typeorm';
import { SearchTaskDto } from './dto/search.task.dto';
import { CreateTaskDto } from './dto/create.task.dto';
import { UpdateTaskDto } from './dto/update.task.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ManyTaskDto } from './dto/many.task.dto';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task)
    private readonly taskRepo: Repository<Task>,
  ) {}

  async getAll(
    pageable: PageDto,
    searchDto: SearchTaskDto,
  ): Promise<Page<Task>> {
    return findAllByPage({
      repo: this.taskRepo,
      page: pageable,
      queryDto: searchDto,
    });
  }

  async add(createDto: CreateTaskDto): Promise<Task> {
    const modal = this.taskRepo.create({
      ...createDto,
    });
    return this.taskRepo.save(modal);
  }

  async findById(id: number): Promise<Task> {
    const modal = await this.taskRepo.findOne({
      where: {
        id,
      },
    } as FindOneOptions);
    if (!modal) {
      throw new NotFoundException(`Task with id '${id}' not found`);
    }
    return modal;
  }

  async findMany(ids: number[]): Promise<Task[]> {
    const modals = await this.taskRepo.find({
      where: {
        id: In(ids),
      },
    });
    return modals;
  }

  async update(id: number, updateDto: UpdateTaskDto): Promise<Task> {
    const dataToUpdate = await this.findById(id);
    const update = {
      ...dataToUpdate,
      ...updateDto,
    };
    return this.taskRepo.save(update);
  }

  async updateMany(manyTasks: ManyTaskDto): Promise<void> {
    console.log(manyTasks)
    const entities = manyTasks.tasks.map((task) => this.taskRepo.create(task));
    await this.taskRepo.save(entities);
  }

  async delete(id: number): Promise<void> {
    const entity = await this.findById(id);
    await this.taskRepo.remove(entity);
  }

  async deleteMany(manyTasks: ManyTaskDto): Promise<void> {
    const entity = await this.findMany(manyTasks.tasks.map((task) => task.id));
    await this.taskRepo.remove(entity);
  }
}
