import { IsOptional, IsString, Length, MaxLength } from 'class-validator';

export class CreateTenantDto {
  @Length(1, 20)
  @IsString()
  name: string;

  @MaxLength(255)
  @IsString()
  @IsOptional()
  description?: string;
}
