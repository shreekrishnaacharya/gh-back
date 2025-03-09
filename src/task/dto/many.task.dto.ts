import { ApiProperty } from '@nestjs/swagger';
import { IsArray, ArrayMinSize, IsInt, IsNotEmpty } from 'class-validator';
import { UpdateTaskDto } from './update.task.dto';

class ManyTaskUpdateDto extends UpdateTaskDto {
  @ApiProperty({ description: 'Task ID', example: 1 })
  @IsNotEmpty({ message: 'id is required' })
  id: number;
}
export class ManyTaskDto {
  @ApiProperty({ type: [Number], description: 'Array of task' })
  @IsArray({ message: 'tasks must be an array' })
  @ArrayMinSize(1, { message: 'At least one task must be provided' })
  tasks: ManyTaskUpdateDto[];
}
