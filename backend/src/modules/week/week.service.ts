import { Injectable } from '@nestjs/common';
import { WeekEntity } from './entities/week.entity';
import { WeekRepository, WeekData } from './week.repository';
import { WeekCalculationService } from './services/week-calculation.service';
import { WeekValidationService } from './services/week-validation.service';

@Injectable()
export class WeekService {
  constructor(
    private readonly weekRepository: WeekRepository,
    private readonly calculationService: WeekCalculationService,
    private readonly validationService: WeekValidationService,
  ) {}

  async generateAndCreateWeeksForCycle(
    cycleId: string,
    startDate: Date,
    endDate: Date,
    transaction?: any,
  ): Promise<WeekEntity[]> {
    const weeksData = this.validateAndGenerateWeeks(startDate, endDate);
    
    await this.createWeeksForCycle(weeksData, cycleId, transaction);
    
    return await this.findByCycleId(cycleId);
  }

  validateAndGenerateWeeks(startDate: Date, endDate: Date): WeekData[] {
    this.validationService.validateWeekGeneration(startDate, endDate);
    
    const weeks: WeekData[] = [];
    const currentStart = new Date(startDate);

    let weekIndex = 1;
    while (currentStart < endDate) {
      const weekEnd = this.calculationService.calculateWeekEnd(currentStart, endDate);

      weeks.push({
        weekIndex,
        startDate: new Date(currentStart),
        endDate: new Date(weekEnd),
      });

      const nextStart = this.calculationService.calculateNextWeekStart(weekEnd);
      currentStart.setTime(nextStart.getTime());
      weekIndex++;
    }

    return weeks;
  }

  async createWeeksForCycle(
    weeksData: WeekData[],
    cycleId: string,
    transaction?: any,
  ): Promise<void> {
    const creationData = weeksData.map(week => ({
      ...week,
      cycleId,
    }));

    if (transaction) {
      await this.weekRepository.createManyWithTransaction(creationData, transaction);
    } else {
      await this.weekRepository.createMany(creationData);
    }
  }

  async findByCycleId(cycleId: string): Promise<WeekEntity[]> {
    return await this.weekRepository.findByCycleId(cycleId);
  }

  async findByIndex(cycleId: string, weekIndex: number): Promise<WeekEntity | null> {
    return await this.weekRepository.findByIndex(cycleId, weekIndex);
  }

  async getCurrentWeek(cycleId: string): Promise<WeekEntity | null> {
    return await this.weekRepository.findCurrentWeek(cycleId);
  }

  async countWeeks(cycleId: string): Promise<number> {
    return await this.weekRepository.countByCycleId(cycleId);
  }

  async updateWeeksForCycle(
    cycleId: string,
    originalStartDate: Date,
    originalEndDate: Date,
    newStartDate?: Date,
    newEndDate?: Date,
    transaction?: any,
  ): Promise<void> {
    if (!newStartDate && !newEndDate) {
      return;
    }

    const finalStartDate = newStartDate || originalStartDate;
    const finalEndDate = newEndDate || originalEndDate;

    await this.deleteWeeksForCycle(cycleId, transaction);
    
    const weeksData = this.validateAndGenerateWeeks(finalStartDate, finalEndDate);
    await this.createWeeksForCycle(weeksData, cycleId, transaction);
  }

  private async deleteWeeksForCycle(cycleId: string, transaction?: any): Promise<void> {
    if (transaction) {
      await transaction.week.deleteMany({ where: { cycleId } });
    } else {
      await this.weekRepository.deleteByCycleId(cycleId);
    }
  }
}