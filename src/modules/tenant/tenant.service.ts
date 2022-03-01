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
    tenant = new TenantEntity(data);
    await this.tenantRepository.insert(tenant);
    return tenant;
  }

  find(): Promise<TenantEntity[]> {
    return this.tenantRepository.find();
  }

  findOne(id: number): Promise<TenantEntity | undefined> {
    return this.tenantRepository.findOne(id);
  }

  findOneByName(name: string): Promise<TenantEntity | undefined> {
    return this.tenantRepository.findOne({ name });
  }

  async update(id: number, data: UpdateTenantDto) {
    if (data.name !== undefined) {
      const tenant = await this.findOneByName(data.name);
      if (tenant && tenant.id !== id) {
        throw new ConflictException(`name "${data.name}" already exists`);
      }
    }
    const { affected } = await this.tenantRepository.update(id, {
      ...data,
      updated_at: () => 'NOW(3)',
    });
    if (!affected) {
      throw new NotFoundException(`client ${id} does not exist`);
    }
  }
}
