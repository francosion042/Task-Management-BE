import { IsEmail, IsNotEmpty } from 'class-validator';
import { Exists } from '../../../common/decorators/custom-validators.decorator';

export class UserLoginDto {
  @IsEmail()
  @IsNotEmpty()
  @Exists({ tableName: 'users', column: 'email' })
  email: string;

  @IsNotEmpty()
  password: string;
}
