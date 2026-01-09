import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '@/prisma/prisma.service';
import { CycleEntity } from '../entities/cycle.entity';
import { UpdateCycleDto } from '../dto/update-cycle.dto';
import { WeekService } from '@/modules/week/week.service';
import { DateValidatorService } from '@/shared/validation/date-validator.service';

@Injectable()
export class CycleUpdateService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly weekService: WeekService,
    private readonly dateValidator: DateValidatorService,
  ) {}

  async updateCycleWithWeeks(
    cycleId: string,
    dto: UpdateCycleDto,
    userId: string,
  ): Promise<CycleEntity> {
    const existingCycle = await this.validateOwnership(cycleId, userId);

    if (dto.status && existingCycle.status !== dto.status) {
      if (dto.status === 'COMPLETED') {
        return this.completeCycle(cycleId, userId);
      }
    }

    const hasDateChanges = dto.startDate || dto.endDate;
    
    if (hasDateChanges) {
      this.dateValidator.validateUpdateDates(dto.startDate, dto.endDate);
      
      return await this.updateWithWeeksRecalculation(cycleId, dto, existingCycle, userId);
    }

    return await this.updateBasicFields(cycleId, dto, userId);
  }

  async completeCycle(cycleId: string, userId: string): Promise<CycleEntity> {
    const cycle = await this.validateOwnership(cycleId, userId);

    if (cycle.status === 'COMPLETED') {
      return cycle;
    }

    const updatedCycle = await this.prisma.cycle.update({
      where: { id: cycleId },
      data: {
        status: 'COMPLETED',
      },
    });

    return CycleEntity.fromPrisma(updatedCycle);
  }

  private async validateOwnership(cycleId: string, userId: string): Promise<CycleEntity> {
    const cycle = await this.prisma.cycle.findUnique({
      where: { id: cycleId },
    });

    if (!cycle) {
      throw new NotFoundException('Cycle not found');
    }

    if (cycle.userId !== userId) {
      throw new NotFoundException('Cycle not found');
    }

    return CycleEntity.fromPrisma(cycle);
  }

  private async updateWithWeeksRecalculation(
    cycleId: string,
    dto: UpdateCycleDto,
    existingCycle: CycleEntity,
    userId: string,
  ): Promise<CycleEntity> {
    return await this.prisma.$transaction(async (tx) => {
      const newStartDate = dto.startDate || existingCycle.startDate;
      const newEndDate = dto.endDate || existingCycle.endDate;

      if (newStartDate >= newEndDate) {
        throw new BadRequestException('Start date must be before end date');
      }

      const updatedCycle = await tx.cycle.update({
        where: { id: cycleId },
        data: {
          startDate: newStartDate,
          endDate: newEndDate,
          ...(dto.status && { status: dto.status }),
        },
      });

      await this.weekService.updateWeeksForCycle(
        cycleId,
        existingCycle.startDate,
        existingCycle.endDate,
        newStartDate,
        newEndDate,
        tx,
      );

      return CycleEntity.fromPrisma(updatedCycle);
    });
  }

  private async updateBasicFields(
    cycleId: string,
    dto: UpdateCycleDto,
    userId: string,
  ): Promise<CycleEntity> {
    const updatedCycle = await this.prisma.cycle.update({
      where: { id: cycleId },
      data: {
        ...(dto.status && { status: dto.status }),
      },
    });

    return CycleEntity.fromPrisma(updatedCycle);
  }
}