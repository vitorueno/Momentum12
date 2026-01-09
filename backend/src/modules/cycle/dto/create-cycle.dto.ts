import { IsDate, IsInt, IsOptional, Min, Max } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateCycleDto {
  @IsDate()
  @Type(() => Date)
  startDate: Date;

  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(52)
  durationInWeeks?: number = 12;
}