import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Task } from '../src/entities/task.entity';
import { TaskModule } from '../src/task/module';
import { CreateTaskDto } from '../src/task/dto/create.task.dto';
import { TaskPriorityEnum, TaskStatusEnum } from '../src/common/enum/task.enum';
import { ConfigModule, ConfigService } from '@nestjs/config';

describe('TaskController (Integration)', () => {
  let app: INestApplication;
  let repository: Repository<Task>;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        // TypeOrmModule.forRootAsync({
        //   imports: [ConfigModule],
        //   inject: [ConfigService],
        //   useFactory: (configService: ConfigService) => ({
        //     type: 'mysql',
        //     host: configService.get('TDB_HOST'),
        //     port: parseInt(configService.get('TDB_USER'), 10),
        //     username: configService.get('TDB_USER'),
        //     password: configService.get('TDB_PASSWORD'),
        //     database: configService.get('TDB_NAME'),
        //     entities: [Task],
        //     synchronize: true,
        //     logging: false,
        //   }),
        // }),
        TypeOrmModule.forRootAsync({
          imports: [ConfigModule],
          inject: [ConfigService],
          useFactory: (configService: ConfigService) => ({
            type: 'mysql',
            host: 'localhost',
            port: 3306,
            username: 'root2',
            password: 'kamal12345',
            database: 'ghtask_test',
            entities: [Task],
            synchronize: true,
            logging: false,
          }),
        }),
        TaskModule,
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        transform: true,
        forbidNonWhitelisted: true,
      }),
    );
    await app.init();

    repository = moduleFixture.get<Repository<Task>>(getRepositoryToken(Task));
  });

  afterAll(async () => {
    await app.close();
  });

  it('should create a task', async () => {
    const createDto: CreateTaskDto = {
      title: 'Test Task',
      description: 'This is a test task',
      due_date: new Date(),
      priority: TaskPriorityEnum.Medium,
      status: TaskStatusEnum.Pending,
    };

    const response = await request(app.getHttpServer())
      .post('/tasks')
      .send(createDto)
      .expect(201);

    expect(response.body).toMatchObject({
      ...createDto,
      due_date: createDto.due_date.toISOString(),
    });
  });

  it('should get all tasks', async () => {
    const response = await request(app.getHttpServer())
      .get('/tasks')
      .expect(200);
    expect(response.body).toBeDefined();
  });

  it('should update a task', async () => {
    const createdTask = await repository.save({
      title: 'Old Task',
      description: 'This is a old task',
      due_date: new Date(),
      priority: TaskPriorityEnum.Medium,
      status: TaskStatusEnum.Pending,
    });

    const updateDto = { title: 'Updated Taskss', status: 'Completed' };

    await request(app.getHttpServer())
      .patch(`/tasks/${createdTask.id}`)
      .send(updateDto)
      .expect(200);
    const response = await request(app.getHttpServer())
      .get(`/tasks/${createdTask.id}`)
      .send(updateDto)
      .expect(200);

    expect(response.body.title).toBe(updateDto.title);
    expect(response.body.status).toBe(updateDto.status);
  });

  it('should delete a task', async () => {
    const createdTask = await repository.save({
      title: 'To be deleted',
      description: 'Will be removed',
      due_date: new Date(),
      priority: TaskPriorityEnum.Medium,
      status: TaskStatusEnum.Pending,
    });

    await request(app.getHttpServer())
      .delete(`/tasks/${createdTask.id}`)
      .expect(200);

    const deletedTask = await repository.findOne({
      where: { id: createdTask.id },
    });
    expect(deletedTask).toBeNull();
  });
});
