import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  IsDate,
} from 'class-validator';
import { Type } from 'class-transformer';
import { TaskPriorityEnum, TaskStatusEnum } from '../../common/enum/task.enum';

export class CreateTaskDto {
  @ApiProperty({ example: 'Complete project report', maxLength: 500 })
  @IsString()
  @IsNotEmpty()
  @MaxLength(500)
  title: string;

  @ApiProperty({ example: 'Write and submit the final project report' })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({
    example: '2025-03-15T00:00:00.000Z',
    type: String,
    format: 'date-time',
  })
  @IsDate()
  @Type(() => Date)
  @IsNotEmpty()
  due_date: Date;

  @ApiPropertyOptional({
    example: TaskPriorityEnum.Medium,
    enum: TaskPriorityEnum,
  })
  @IsEnum(TaskPriorityEnum)
  @IsOptional()
  priority?: TaskPriorityEnum = TaskPriorityEnum.Medium;

  @ApiPropertyOptional({
    example: TaskStatusEnum.Pending,
    enum: TaskStatusEnum,
  })
  @IsEnum(TaskStatusEnum)
  @IsOptional()
  status?: TaskStatusEnum = TaskStatusEnum.Pending;
}
