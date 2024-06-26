import { PartialType } from '@nestjs/swagger';
import { CreateTaskDto } from './create-task.dto';
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

export class UpdateTaskDto extends PartialType(CreateTaskDto) {
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  title?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsEnum(TaskDifficulty)
  @IsOptional()
  difficulty?: string;

  @IsEnum(TaskPriority)
  @IsOptional()
  priority?: string;

  @IsObject()
  @IsNotEmpty()
  @IsNotEmptyObject()
  @IsOptional()
  duration?: { durationNumber: number; durationType: string };

  @IsDateString()
  @IsOptional()
  startDate?: string;

  @IsDateString()
  @IsOptional()
  dueDate?: string;

  @IsNumber()
  @IsOptional()
  @Exists({ tableName: 'task_columns', column: 'id' })
  taskColumnId?: number;
}
