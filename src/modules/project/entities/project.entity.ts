import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { User } from '../../user/entities/user.entity';
import { ProjectStatus } from './index.enum';
import { Task } from 'src/modules/task/entities/task.entity';
import { TaskColumn } from 'src/modules/task-column/entities/task-column.entity';

@Entity({ name: 'projects' })
export class Project {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column('text')
  description: string;

  @Column({ type: 'enum', enum: ProjectStatus, default: ProjectStatus.OPEN })
  status: string;

  @Column({ type: 'jsonb', name: 'task_column_order_ids' })
  taskColumnOrderIds: [];

  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
    update: false,
  })
  createdAt: Date;

  @CreateDateColumn({
    name: 'updated_at',
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
    update: true,
  })
  updatedAt: Date;

  @Column({ name: 'owner_id' })
  ownerId: number;

  @ManyToOne(() => User, (user) => user.projects)
  owner: User;

  @OneToMany(() => TaskColumn, (taskColumn) => taskColumn.project)
  taskColumns: TaskColumn[];

  @OneToMany(() => Task, (task) => task.project)
  tasks: Task[];
}
