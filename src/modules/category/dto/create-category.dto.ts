import { IsInt, IsOptional, IsString, Length } from 'class-validator';

export class CreateCategoryDto {
  @Length(1, 255)
  @IsString()
  name: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsInt()
  @IsOptional()
  parent_id?: number;
}
