import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserEntity } from './entities/user.entity';

@Injectable()
export class UserService {
  @InjectRepository(UserEntity)
  private userRepository: Repository<UserEntity>;

  async create(tenantId: number, data: CreateUserDto): Promise<UserEntity> {
    const user = new UserEntity(data);
    user.tenant_id = tenantId;
    await user.setPassword(data.password);
    await this.userRepository.insert(user);
    delete user.password;
    return user;
  }

  findOneByUsername(
    tenantId: number,
    username: string,
  ): Promise<UserEntity | undefined> {
    return this.userRepository.findOne({
      where: {
        tenant_id: tenantId,
        username,
      },
    });
  }

  async findOneByUsernameAndSelectPassword(
    tenantId: number,
    username: string,
  ): Promise<UserEntity | undefined> {
    return this.userRepository
      .createQueryBuilder('user')
      .addSelect('user.password')
      .where('user.tenant_id = :tenantId', { tenantId })
      .andWhere('user.username = :username', { username })
      .getOne();
  }

  async update(userId: number, data: UpdateUserDto) {
    const { affected } = await this.userRepository.update(userId, {
      ...data,
      updated_at: () => 'NOW(3)',
    });
    if (!affected) {
      throw new NotFoundException(`user ${userId} does not exist`);
    }
  }
}
