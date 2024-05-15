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
  projectId?: number;

  @IsNumber()
  taskColumnId: number;

  @IsDateString()
  @IsOptional()
  startDate?: string;

  @IsDateString()
  @IsOptional()
  dueDate?: string;
}
