import { Test, TestingModule } from '@nestjs/testing';
import { TaskService } from './service';
import { TaskController } from './controller';
import { TaskPriorityEnum, TaskStatusEnum } from '../common/enum/task.enum';
import { ResponseStatusEnum } from '../common/enum/common.enum';
import { NotFoundException } from '@nestjs/common';

const mockTask = {
  id: 1,
  title: 'Test Task',
  description: 'Test Description',
  due_date: new Date(),
  priority: TaskPriorityEnum.High,
  status: TaskStatusEnum.Completed,
};

const taskPage = { elements: [mockTask], totalElements: 1 };

const mockTaskService = {
  getAll: jest.fn().mockResolvedValue(taskPage),
  add: jest.fn((createDto) => Promise.resolve({ id: 1, ...createDto })),
  updateMany: jest.fn(),
  update: jest.fn((id, updateDto) =>
    Promise.resolve({ ...mockTask, ...updateDto, id }),
  ),
  deleteMany: jest.fn(),
  delete: jest.fn(),
};

describe('TaskController', () => {
  let controller: TaskController;
  let service: TaskService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TaskController],
      providers: [{ provide: TaskService, useValue: mockTaskService }],
    }).compile();

    controller = module.get<TaskController>(TaskController);
    service = module.get<TaskService>(TaskService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return all tasks', async () => {
    expect(await controller.getAll()).toEqual(taskPage);
  });

  it('should add a task', async () => {
    expect(await controller.add(mockTask)).toEqual(mockTask);
  });

  it('should update a task', async () => {
    expect(await controller.update(1, { title: 'Updated' })).toEqual({
      ...mockTask,
      title: 'Updated',
    });
  });

  it('should delete a task', async () => {
    await expect(controller.delete(1)).resolves.toHaveProperty(
      'status',
      ResponseStatusEnum.SUCCESS,
    );
  });

  it('should return 404 not found', async () => {
    jest.spyOn(service, 'update').mockRejectedValue(new NotFoundException());
    await expect(controller.update(1, { title: 'Updated' })).rejects.toThrow(
      NotFoundException,
    );
  });
});
