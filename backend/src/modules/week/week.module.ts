import { Module } from '@nestjs/common';
import { WeekService } from './week.service';
import { WeekRepository } from './week.repository';
import { WeekCalculationService } from './services/week-calculation.service';
import { WeekValidationService } from './services/week-validation.service';
import { PrismaModule } from '@/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [
    WeekService,
    WeekRepository,
    WeekCalculationService,
    WeekValidationService,
  ],
  exports: [
    WeekService,
    WeekRepository,
    WeekCalculationService,
    WeekValidationService,
  ],
})
export class WeekModule {}