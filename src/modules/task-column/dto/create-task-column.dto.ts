import { IsNumber, IsOptional, IsString } from 'class-validator';
import { Exists } from '../../../common/decorators/custom-validators.decorator';

export class CreateTaskColumnDto {
  @IsString()
  name: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsNumber()
  @IsOptional()
  @Exists({ tableName: 'projects', column: 'id' })
  projectId?: number;
}
