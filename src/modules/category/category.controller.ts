import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CurrentTenant } from '@/common';
import { TenantEntity } from '../tenant';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';

@Controller('clients/:tenantId/categories')
export class CategoryController {
  constructor(private categoryService: CategoryService) {}

  @Post()
  create(
    @CurrentTenant() tenant: TenantEntity,
    @Body() data: CreateCategoryDto,
  ) {
    return this.categoryService.create(tenant.id, data);
  }

  @Get()
  find(@CurrentTenant() tenant: TenantEntity) {
    return this.categoryService.find(tenant.id);
  }

  @Get(':id')
  findOne(@CurrentTenant() tenant: TenantEntity, @Param('id') id: number) {
    return this.categoryService.findOneOrFail(tenant.id, id);
  }
}
