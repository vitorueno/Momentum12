import { Injectable, ConflictException } from '@nestjs/common';
import { PrismaService } from '@/prisma/prisma.service';
import { CycleEntity } from '../entities/cycle.entity';
import { CreateCycleDto } from '../dto/create-cycle.dto';
import { WeekService } from '@/modules/week/week.service';
import { DateValidatorService } from '@/shared/validation/date-validator.service';
import { DateCalculationUtil } from '@/shared/utils/date-calculation.util';

@Injectable()
export class CycleCreationService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly weekService: WeekService,
    private readonly dateValidator: DateValidatorService,
  ) {}

  async createCycleWithWeeks(
    dto: CreateCycleDto,
    userId: string,
  ): Promise<CycleEntity> {
    await this.validateCreationRules(dto.startDate, dto.durationInWeeks, userId);

    const startDate = new Date(dto.startDate);
    const durationInWeeks = dto.durationInWeeks || 12;
    const endDate = DateCalculationUtil.calculateEndDate(startDate, durationInWeeks);

    const cycle = await this.prisma.$transaction(async (tx) => {
      const newCycle = await tx.cycle.create({
        data: {
          userId,
          startDate,
          endDate,
          status: 'ACTIVE',
        },
      });

      await this.weekService.generateAndCreateWeeksForCycle(
        newCycle.id,
        startDate,
        endDate,
        tx,
      );

      return newCycle;
    });

    return CycleEntity.fromPrisma(cycle);
  }

  private async validateCreationRules(
    startDate: Date,
    durationInWeeks: number | undefined,
    userId: string,
  ): Promise<void> {
    this.dateValidator.validateCreationDate(startDate, durationInWeeks);

    await this.validateNoActiveCycle(userId);
  }

  private async validateNoActiveCycle(userId: string): Promise<void> {
    const activeCycle = await this.prisma.cycle.findFirst({
      where: {
        userId,
        status: 'ACTIVE',
      },
    });

    if (activeCycle) {
      throw new ConflictException('User already has an active cycle');
    }
  }
}