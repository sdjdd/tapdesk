import { Body, Controller, Get, NotFoundException, Post } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CurrentTenant } from '@/common';
import { TenantEntity } from '../tenant';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { CategoryEntity } from './entities/category.entity';

@Controller('clients/:tenantId/categories')
export class CategoryController {
  @InjectRepository(CategoryEntity)
  private categoryRepository: Repository<CategoryEntity>;

  constructor(private categoryService: CategoryService) {}

  @Post()
  async create(
    @CurrentTenant() tenant: TenantEntity,
    @Body() data: CreateCategoryDto,
  ) {
    if (data.parent_id) {
      const parent = await this.categoryRepository.findOne({
        where: {
          tenant_id: tenant.id,
          parent_id: data.parent_id,
        },
      });
      if (!parent) {
        throw new NotFoundException(
          `The parent category ${data.parent_id} does not exist`,
        );
      }
    }
    return this.categoryService.create(tenant.id, data);
  }

  @Get()
  find(@CurrentTenant() tenant: TenantEntity) {
    return this.categoryRepository.find({ tenant_id: tenant.id });
  }
}
