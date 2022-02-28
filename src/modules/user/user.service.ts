import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UserEntity } from './entities/user.entity';

@Injectable()
export class UserService {
  @InjectRepository(UserEntity)
  private userRepository: Repository<UserEntity>;

  async create(tenantId: number, data: CreateUserDto) {
    const user = new UserEntity(data);
    user.tenant_id = tenantId;
    await user.setPassword(data.password);
    await this.userRepository.insert(user);
    delete user.password;
    return user;
  }

  findOneByUsername(tenantId: number, username: string) {
    return this.userRepository.findOne({
      where: {
        tenant_id: tenantId,
        username,
      },
    });
  }

  async findOneByUsernameAndSelectPassword(tenantId: number, username: string) {
    return this.userRepository
      .createQueryBuilder('user')
      .addSelect('user.password')
      .where('user.tenant_id = :tenantId', { tenantId })
      .andWhere('user.username = :username', { username })
      .getOne();
  }
}
