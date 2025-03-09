import { Test, TestingModule } from '@nestjs/testing';
import { TaskPriorityEnum, TaskStatusEnum } from '../common/enum/task.enum';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Task } from '../entities/task.entity';
import { TaskService } from './service';
import { NotFoundException } from '@nestjs/common';

const mockTask = {
  id: 1,
  title: 'Test Task',
  description: 'Test Description',
  due_date: new Date(),
  priority: TaskPriorityEnum.High,
  status: TaskStatusEnum.Completed,
};

const mockRepository = {
  create: jest.fn().mockImplementation((dto) => dto),
  save: jest.fn((createDto) =>
    Promise.resolve({ ...createDto, id: createDto.id ?? 1 }),
  ),
  findOne: jest.fn().mockResolvedValue(mockTask),
  find: jest.fn().mockResolvedValue([mockTask]),
  remove: jest.fn().mockResolvedValue(undefined),
};

describe('TaskService', () => {
  let service: TaskService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TaskService,
        { provide: getRepositoryToken(Task), useValue: mockRepository },
      ],
    }).compile();

    service = module.get<TaskService>(TaskService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a task', async () => {
    const result = await service.add(mockTask);
    expect(result).toEqual(mockTask);
    expect(mockRepository.save).toHaveBeenCalled();
  });

  it('should return a task by id', async () => {
    const result = await service.findById(1);
    expect(result).toEqual(mockTask);
  });

  it('should throw NotFoundException if task not found', async () => {
    mockRepository.findOne.mockResolvedValue(null);
    await expect(service.findById(99)).rejects.toThrow(NotFoundException);
  });

  it('should update a task', async () => {
    mockRepository.findOne.mockResolvedValue(mockTask);
    const result = await service.update(1, { title: 'Updated Task' });
    expect(result.title).toEqual('Updated Task');
  });

  it('should delete a task', async () => {
    await expect(service.delete(1)).resolves.toBeTruthy();
  });
});
