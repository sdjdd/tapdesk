import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { CategoryEntity } from './entities/category.entity';

@Injectable()
export class CategoryService {
  @InjectRepository(CategoryEntity)
  private categoryRepository: Repository<CategoryEntity>;

  async create(tenantId: number, data: CreateCategoryDto) {
    const category = new CategoryEntity();
    category.tenant_id = tenantId;
    if (data.parent_id) {
      const parent = await this.findOne(tenantId, data.parent_id);
      if (!parent) {
        throw new BadRequestException('parent category does not exist');
      }
      category.parent = parent;
    }
    category.name = data.name;
    category.description = data.description ?? '';
    await this.categoryRepository.insert(category);
    return category;
  }

  find(tenantId: number): Promise<CategoryEntity[]> {
    return this.categoryRepository.find({ tenant_id: tenantId });
  }

  findOne(tenantId: number, id: number): Promise<CategoryEntity | undefined> {
    return this.categoryRepository.findOne({
      tenant_id: tenantId,
      id,
    });
  }

  async findOneOrFail(tenantId: number, id: number): Promise<CategoryEntity> {
    const category = await this.findOne(tenantId, id);
    if (!category) {
      throw new NotFoundException(`category ${id} does not exist`);
    }
    return category;
  }

  async update(tenantId: number, id: number, data: UpdateCategoryDto) {
    await this.findOneOrFail(tenantId, id);
    await this.categoryRepository.update(id, {
      ...data,
      updated_at: () => 'NOW(3)',
    });
  }
}
