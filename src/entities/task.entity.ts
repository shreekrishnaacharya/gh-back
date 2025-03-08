import { Entity, Column } from 'typeorm';
import { BaseEntity } from './base.entity';
import { TaskPriorityEnum, TaskStatusEnum } from 'src/common/enum/task.enum';

@Entity({ name: 'tasks' })
export class Task extends BaseEntity {
  @Column({ type: 'varchar', length: 500 })
  title: string;

  @Column({ type: 'text' })
  description: string;

  @Column({ type: 'datetime' })
  due_date: Date;

  @Column({
    type: 'enum',
    enum: TaskPriorityEnum,
    default: TaskPriorityEnum.Medium,
  })
  priority: TaskPriorityEnum;

  @Column({
    type: 'enum',
    enum: TaskStatusEnum,
    default: TaskStatusEnum.Pending,
  })
  status: TaskStatusEnum;
}
