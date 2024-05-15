import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';
import { isUnique } from '../../../common/custom-validators/index.decorator';

export class UserRegisterDto {
  @IsNotEmpty()
  firstName: string;

  @IsNotEmpty()
  lastName: string;

  @IsEmail()
  @IsNotEmpty()
  @isUnique({ tableName: 'users', column: 'email' })
  email: string;

  @IsNotEmpty()
  @MinLength(5)
  password: string;
}
