import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Param,
  ParseIntPipe,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import argon2 from 'argon2';
import { CreateUserDto } from './dto/create-user.dto';
import { UserEntity } from './entities/user.entity';

@Controller('projects/:projectId/users')
@UseInterceptors(ClassSerializerInterceptor)
export class UserController {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  @Post()
  async create(
    @Param('projectId', ParseIntPipe) projectId: number,
    @Body() createUserDto: CreateUserDto,
  ) {
    const user = new UserEntity(createUserDto);
    user.project_id = projectId;
    user.password = await argon2.hash(createUserDto.password);
    await this.userRepository.insert(user);
    return user;
  }
}
