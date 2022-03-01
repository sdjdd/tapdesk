import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
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
    if (await this.findOneByUsername(tenantId, data.username)) {
      throw new ConflictException(`username "${data.username}" already exist`);
    }
    if (data.email && (await this.findOneByEmail(tenantId, data.email))) {
      throw new ConflictException(`email "${data.email}" already exist`);
    }
    const user = new UserEntity();
    user.tenant_id = tenantId;
    user.username = data.username;
    await user.setPassword(data.password);
    user.email = data.email;
    await this.userRepository.insert(user);
    delete user.password;
    return user;
  }

  findOne(tenantId: number, id: number): Promise<UserEntity | undefined> {
    return this.userRepository.findOne({ tenant_id: tenantId, id });
  }

  async findOneOrFail(tenantId: number, id: number): Promise<UserEntity> {
    const user = await this.findOne(tenantId, id);
    if (!user) {
      throw new NotFoundException(`user ${id} does not exist`);
    }
    return user;
  }

  findOneByUsername(
    tenantId: number,
    username: string,
  ): Promise<UserEntity | undefined> {
    return this.userRepository.findOne({ tenant_id: tenantId, username });
  }

  findOneByEmail(
    tenantId: number,
    email: string,
  ): Promise<UserEntity | undefined> {
    return this.userRepository.findOne({ tenant_id: tenantId, email });
  }

  async findOneForAuthentication(
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

  async update(tenantId: number, id: number, data: UpdateUserDto) {
    await this.findOneOrFail(tenantId, id);
    await this.userRepository.update(id, {
      ...data,
      updated_at: () => 'NOW(3)',
    });
  }
}
