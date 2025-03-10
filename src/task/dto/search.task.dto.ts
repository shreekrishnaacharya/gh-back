import {
  IsEnum,
  IsOptional,
  IsString,
  MaxLength,
  IsDate,
} from 'class-validator';
import { TaskPriorityEnum, TaskStatusEnum } from '../../common/enum/task.enum';
import { Type } from 'class-transformer';
import { PageSearch } from '@sksharma72000/nestjs-search-page';
import { ApiProperty } from '@nestjs/swagger';

export class SearchTaskDto {
  @ApiProperty({
    required: false,
    example: 'Complete project report',
    maxLength: 500,
  })
  @IsString()
  @IsOptional()
  @MaxLength(500)
  @PageSearch()
  title?: string;

  @ApiProperty({
    required: false,
    example: 'Write and submit the final project report',
  })
  @IsString()
  @IsOptional()
  @PageSearch()
  description?: string;

  @ApiProperty({
    required: false,
    example: '2025-03-15T00:00:00.000Z',
    type: String,
    format: 'date-time',
  })
  @IsDate()
  @Type(() => Date)
  @IsOptional()
  @PageSearch()
  due_date?: Date;

  @ApiProperty({
    required: false,
    example: TaskPriorityEnum.Medium,
    type: 'enum',
    enum: TaskPriorityEnum,
  })
  @IsOptional()
  @PageSearch({ operator: 'and', operation: 'in' })
  priority?: TaskPriorityEnum;

  @ApiProperty({
    required: false,
    example: TaskStatusEnum.Pending,
    type: 'enum',
    enum: TaskStatusEnum,
  })
  @IsEnum(TaskStatusEnum)
  @IsOptional()
  @PageSearch({ operator: 'and', operation: 'eq' })
  status?: TaskStatusEnum;
}
