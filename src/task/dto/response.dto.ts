import { ApiProperty } from '@nestjs/swagger';
import { Page } from '@sksharma72000/nestjs-search-page';
import { TaskPriorityEnum, TaskStatusEnum } from 'src/common/enum/task.enum';

export class ResponseTaskDto {
  @ApiProperty({ example: 'Complete project report' })
  title: string;

  @ApiProperty({ example: 'Write and submit the final project report' })
  description: string;

  @ApiProperty({
    example: '2025-03-15T00:00:00.000Z',
    type: String,
    format: 'date-time',
  })
  due_date: Date;

  @ApiProperty({
    example: TaskStatusEnum.Pending,
    type: 'enum',
    enum: TaskStatusEnum,
  })
  status: TaskStatusEnum;

  @ApiProperty({
    example: TaskPriorityEnum.Medium,
    type: 'enum',
    enum: TaskPriorityEnum,
  })
  priority: TaskPriorityEnum;
}

export class TaskPage extends Page<ResponseTaskDto> {
  @ApiProperty({
    type: [ResponseTaskDto],
    example: [
      {
        title: 'Complete project report',
        description: 'Write and submit the final project report',
        due_date: '2025-03-15T00:00:00.000Z',
        status: TaskStatusEnum.Pending,
        priority: TaskPriorityEnum.Medium,
      },
    ],
  })
  public elements: ResponseTaskDto[];
}
