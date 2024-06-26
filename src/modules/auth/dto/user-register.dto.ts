import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';
import { IsUnique } from '../../../common/decorators/custom-validators.decorator';

export class UserRegisterDto {
  @IsNotEmpty()
  firstName: string;

  @IsNotEmpty()
  lastName: string;

  @IsEmail()
  @IsNotEmpty()
  @IsUnique({ tableName: 'users', column: 'email' })
  email: string;

  @IsNotEmpty()
  @MinLength(5)
  password: string;
}
