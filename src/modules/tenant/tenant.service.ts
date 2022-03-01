import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTenantDto } from './dto/create-tenant.dto';
import { UpdateTenantDto } from './dto/update-tenant.dto';
import { TenantEntity } from './entities/tenant.entity';

@Injectable()
export class TenantService {
  @InjectRepository(TenantEntity)
  private tenantRepository: Repository<TenantEntity>;

  async create(data: CreateTenantDto): Promise<TenantEntity> {
    let tenant = await this.findOneByName(data.name);
    if (tenant) {
      throw new ConflictException(`name "${data.name}" already exists`);
    }
    tenant = new TenantEntity();
    tenant.name = data.name;
    tenant.description = data.description ?? '';
    await this.tenantRepository.insert(tenant);
    return tenant;
  }

  find(): Promise<TenantEntity[]> {
    return this.tenantRepository.find();
  }

  findOne(id: number): Promise<TenantEntity | undefined> {
    return this.tenantRepository.findOne(id);
  }

  async findOneOrFail(id: number): Promise<TenantEntity> {
    const tenant = await this.findOne(id);
    if (!tenant) {
      throw new NotFoundException(`client ${id} does not exist`);
    }
    return tenant;
  }

  findOneByName(name: string): Promise<TenantEntity | undefined> {
    return this.tenantRepository.findOne({ name });
  }

  async update(id: number, data: UpdateTenantDto) {
    const tenant = await this.findOneOrFail(id);
    if (data.name !== undefined && data.name !== tenant.name) {
      if (await this.findOneByName(data.name)) {
        throw new ConflictException(`name "${data.name}" already exists`);
      }
    }
    await this.tenantRepository.update(id, {
      ...data,
      updated_at: () => 'NOW(3)',
    });
  }
}
