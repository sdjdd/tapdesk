import {
  Body,
  ConflictException,
  Controller,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateTenantDto } from './dto/create-tenant.dto';
import { UpdateTenantDto } from './dto/update-tenant.dto';
import { TenantEntity } from './entities/tenant.entity';
import { FindTenantPipe } from './pipes/find-tenant.pipe';
import { TenantService } from './tenant.service';

@Controller('clients')
export class TenantController {
  constructor(private tenantService: TenantService) {}

  @Post()
  async create(@Body() createTenantDto: CreateTenantDto) {
    if (await this.tenantService.hasName(createTenantDto.name)) {
      throw new ConflictException(
        `Client with name "${createTenantDto.name}" already exists`,
      );
    }
    return this.tenantService.create(createTenantDto);
  }

  @Patch(':id')
  async update(
    @Param('id', FindTenantPipe) tenant: TenantEntity,
    @Body() updateTenantDto: UpdateTenantDto,
  ) {
    if (
      updateTenantDto.name &&
      tenant.name !== updateTenantDto.name &&
      (await this.tenantService.hasName(updateTenantDto.name))
    ) {
      throw new ConflictException(
        `Client with name "${updateTenantDto.name}" already exists`,
      );
    }
    await this.tenantService.update(tenant.id, updateTenantDto);
  }
}
