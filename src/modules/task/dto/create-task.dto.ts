import {
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsNotEmptyObject,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
} from 'class-validator';
import { TaskDifficulty, TaskPriority } from '../entities/index.enum';
import { Exists } from '../../../common/decorators/custom-validators.decorator';

export class CreateTaskDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsEnum(TaskDifficulty)
  difficulty: string;

  @IsEnum(TaskPriority)
  priority: string;

  @IsObject()
  @IsNotEmpty()
  @IsNotEmptyObject()
  duration: { durationNumber: number; durationType: string };

  @IsNumber()
  @IsOptional()
  @Exists({ tableName: 'projects', column: 'id' })
  projectId?: number;

  @IsNumber()
  @Exists({ tableName: 'task_columns', column: 'id' })
  taskColumnId: number;

  @IsDateString()
  @IsOptional()
  startDate?: string;

  @IsDateString()
  @IsOptional()
  dueDate?: string;
}
