import { PartialType } from '@nestjs/mapped-types';
import { CreateTaskDto } from './create.task.dto';
import { IsNumber, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';

export class UpdateTaskDto extends PartialType(CreateTaskDto) {
  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  id?: number;
}
