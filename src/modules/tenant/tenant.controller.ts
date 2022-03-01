import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateTenantDto } from './dto/create-tenant.dto';
import { UpdateTenantDto } from './dto/update-tenant.dto';
import { TenantService } from './tenant.service';

@Controller('clients')
export class TenantController {
  constructor(private tenantService: TenantService) {}

  @Post()
  create(@Body() data: CreateTenantDto) {
    return this.tenantService.create(data);
  }

  @Get()
  find() {
    return this.tenantService.find();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    const tenant = this.tenantService.findOne(id);
    if (!tenant) {
      throw new NotFoundException(`client ${id} does not exist`);
    }
    return tenant;
  }

  @Patch(':id')
  async update(@Param('id') id: number, @Body() data: UpdateTenantDto) {
    await this.tenantService.update(id, data);
  }
}
