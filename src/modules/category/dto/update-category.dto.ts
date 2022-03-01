import { PartialType } from '@nestjs/mapped-types';
import { IsBoolean, IsInt, IsOptional, Max, Min } from 'class-validator';
import { CreateCategoryDto } from './create-category.dto';

export class UpdateCategoryDto extends PartialType(CreateCategoryDto) {
  @IsBoolean()
  @IsOptional()
  active?: boolean;

  @IsInt()
  @Min(0)
  @Max(65535)
  @IsOptional()
  position?: number;
}
