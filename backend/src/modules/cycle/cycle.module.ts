import { Module } from '@nestjs/common';
import { CycleController } from './cycle.controller';
import { CycleService } from './cycle.service';
import { CycleCreationService } from './services/cycle-creation.service';
import { CycleUpdateService } from './services/cycle-update.service';
import { CycleQueryService } from './services/cycle-query.service';
import { DateValidatorService } from '@/shared/validation/date-validator.service';
import { DateCalculationUtil } from '@/shared/utils/date-calculation.util';
import { PrismaModule } from '@/prisma/prisma.module';
import { WeekModule } from '@/modules/week/week.module';

@Module({
  imports: [PrismaModule, WeekModule],
  controllers: [CycleController],
  providers: [
    CycleService,
    CycleCreationService,
    CycleUpdateService,
    CycleQueryService,
    DateValidatorService,
    DateCalculationUtil,
  ],
  exports: [CycleService],
})
export class CycleModule {}