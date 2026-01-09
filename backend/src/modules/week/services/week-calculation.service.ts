import { Injectable } from '@nestjs/common';
import { WEEK_CONSTANTS } from '../constants/week.constants';
import { TIME_CONSTANTS } from '@/shared/constants/time.constants';

@Injectable()
export class WeekCalculationService {
  calculateWeekEnd(currentStart: Date, cycleEnd: Date): Date {
    const weekEnd = new Date(currentStart);
    weekEnd.setDate(weekEnd.getDate() + WEEK_CONSTANTS.WEEK_END_DAY_OFFSET);

    if (weekEnd > cycleEnd) {
      weekEnd.setTime(cycleEnd.getTime());
    }

    return weekEnd;
  }

  calculateDurationInDays(startDate: Date, endDate: Date): number {
    const durationMs = endDate.getTime() - startDate.getTime();
    return Math.ceil(durationMs / TIME_CONSTANTS.MILLISECONDS_PER_DAY);
  }

  getWeekCount(startDate: Date, endDate: Date): number {
    const durationInDays = this.calculateDurationInDays(startDate, endDate);
    return Math.ceil(durationInDays / WEEK_CONSTANTS.DAYS_PER_WEEK);
  }

  isLastWeek(weekEnd: Date, cycleEnd: Date): boolean {
    const weekEndPlusOne = new Date(weekEnd);
    weekEndPlusOne.setDate(weekEndPlusOne.getDate() + 1);
    return weekEndPlusOne > cycleEnd;
  }

  calculateNextWeekStart(weekEnd: Date): Date {
    const nextStart = new Date(weekEnd);
    nextStart.setDate(nextStart.getDate() + 1);
    return nextStart;
  }
}