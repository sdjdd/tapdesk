import { Injectable } from '@nestjs/common';
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
    const tenant = new TenantEntity(data);
    await this.tenantRepository.insert(tenant);
    return tenant;
  }

  findOne(id: number): Promise<TenantEntity | undefined> {
    return this.tenantRepository.findOne(id);
  }

  findOneByName(name: string): Promise<TenantEntity | undefined> {
    return this.tenantRepository.findOne({ name });
  }

  async hasName(name: string): Promise<boolean> {
    const tenant = await this.findOneByName(name);
    return !!tenant;
  }

  async update(id: number, data: UpdateTenantDto) {
    await this.tenantRepository.update(id, data);
  }
}
