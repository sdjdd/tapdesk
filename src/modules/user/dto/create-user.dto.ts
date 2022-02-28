import { IsEmail, IsOptional, IsString, Length } from 'class-validator';

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
}
