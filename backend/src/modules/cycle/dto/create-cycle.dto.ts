import { IsDate, IsInt, IsOptional, Min, Max } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateCycleDto {
  @ApiProperty({
    description: 'Start date of the cycle',
    example: '2024-01-01',
    format: 'date'
  })
  @IsDate()
  @Type(() => Date)
  startDate: Date;

  @ApiPropertyOptional({
    description: 'Duration of the cycle in weeks',
    example: 12,
    minimum: 1,
    maximum: 52,
    default: 12
  })
  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(52)
  durationInWeeks?: number = 12;
}