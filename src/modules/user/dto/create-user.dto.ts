import { IsEmail, IsIn, IsOptional, IsString, Length } from 'class-validator';
import { UserEntity } from '..';

export class CreateUserDto {
  @Length(1, 20)
  @IsString()
  username: string;

  @Length(6, 128)
  @IsString()
  password: string;

  @IsEmail()
  @IsOptional()
  email?: string;

  @IsIn(['end-user', 'agent', 'admin'])
  @IsOptional()
  role?: UserEntity['role'];
}
