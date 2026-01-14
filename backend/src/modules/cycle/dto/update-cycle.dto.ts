import { IsOptional, IsEnum, IsDate } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateCycleDto {
  @ApiPropertyOptional({
    description: 'Cycle status',
    example: 'COMPLETED',
    enum: ['ACTIVE', 'COMPLETED']
  })
  @IsOptional()
  @IsEnum(['ACTIVE', 'COMPLETED'])
  status?: 'ACTIVE' | 'COMPLETED';

  @ApiPropertyOptional({
    description: 'Start date of the cycle',
    example: '2024-01-01',
    format: 'date'
  })
  @IsOptional()
  @IsDate()
  @Type(() => Date)
  startDate?: Date;

  @ApiPropertyOptional({
    description: 'End date of the cycle',
    example: '2024-03-31',
    format: 'date'
  })
  @IsOptional()
  @IsDate()
  @Type(() => Date)
  endDate?: Date;
}