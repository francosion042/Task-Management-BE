import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateTaskColumnDto {
  @IsString()
  name: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsNumber()
  @IsOptional()
  projectId?: number;
}
