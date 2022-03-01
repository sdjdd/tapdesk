import { PartialType, PickType } from '@nestjs/mapped-types';
import { IsIn, IsOptional } from 'class-validator';
import { UserEntity } from '..';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(
  PickType(CreateUserDto, ['email']),
) {
  @IsIn(['end-user', 'agent', 'admin'])
  @IsOptional()
  role?: UserEntity['role'];
}
