import { IsInt, IsOptional, IsString, Length } from 'class-validator';

export class CreateTicketDto {
  @IsInt()
  category_id: number;

  @IsInt()
  @IsOptional()
  requester_id: number;

  @Length(1, 255)
  @IsString()
  subject: string;

  @IsString()
  description: string;
}
