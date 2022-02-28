import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCategoryDto } from './dto/create-category.dto';
import { CategoryEntity } from './entities/category.entity';

@Injectable()
export class CategoryService {
  @InjectRepository(CategoryEntity)
  private categoryRepository: Repository<CategoryEntity>;

  async create(tenantId: number, data: CreateCategoryDto) {
    const category = new CategoryEntity(data);
    category.tenant_id = tenantId;
    await this.categoryRepository.insert(category);
    return category;
  }
}
