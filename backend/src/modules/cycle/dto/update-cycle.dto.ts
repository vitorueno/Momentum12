import { IsOptional, IsEnum, IsDate } from 'class-validator';
import { Type } from 'class-transformer';

export class UpdateCycleDto {
  @IsOptional()
  @IsEnum(['ACTIVE', 'COMPLETED'])
  status?: 'ACTIVE' | 'COMPLETED';

  @IsOptional()
  @IsDate()
  @Type(() => Date)
  startDate?: Date;

  @IsOptional()
  @IsDate()
  @Type(() => Date)
  endDate?: Date;
}