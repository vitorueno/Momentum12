import { Injectable } from '@nestjs/common';
import { WEEK_ERROR_MESSAGES } from '../constants/error.constants';
import { TIME_CONSTANTS } from '@/shared/constants/time.constants';
import { WeekEntity } from '../entities/week.entity';

@Injectable()
export class WeekValidationService {
  validateWeekSequence(weeks: WeekEntity[]): void {
    for (let i = 0; i < weeks.length - 1; i++) {
      const currentWeek = weeks[i];
      const nextWeek = weeks[i + 1];

      this.validateWeekIndexSequence(currentWeek, nextWeek);
      this.validateWeekDateContinuity(currentWeek, nextWeek);
    }
  }

  validateWeekGeneration(startDate: Date, endDate: Date): void {
    if (startDate >= endDate) {
      throw new Error(WEEK_ERROR_MESSAGES.INVALID_DATE_RANGE);
    }

    const durationMs = endDate.getTime() - startDate.getTime();
    const durationDays = Math.ceil(durationMs / TIME_CONSTANTS.MILLISECONDS_PER_DAY);
    
    if (durationDays > 365) {
      throw new Error(WEEK_ERROR_MESSAGES.CYCLE_TOO_LONG);
    }

    if (durationDays < 7) {
      throw new Error(WEEK_ERROR_MESSAGES.CYCLE_TOO_SHORT);
    }
  }

  private validateWeekIndexSequence(currentWeek: WeekEntity, nextWeek: WeekEntity): void {
    const expectedWeekIndex = currentWeek.weekIndex + 1;
    
    if (nextWeek.weekIndex !== expectedWeekIndex) {
      const errorMessage = WEEK_ERROR_MESSAGES.INVALID_WEEK_SEQUENCE
        .replace('{current}', currentWeek.weekIndex.toString())
        .replace('{expected}', expectedWeekIndex.toString());
      throw new Error(errorMessage);
    }
  }

  private validateWeekDateContinuity(currentWeek: WeekEntity, nextWeek: WeekEntity): void {
    const expectedNextStart = new Date(currentWeek.endDate);
    expectedNextStart.setDate(expectedNextStart.getDate() + 1);

    const actualNextStart = new Date(nextWeek.startDate);
    const timeDifference = Math.abs(actualNextStart.getTime() - expectedNextStart.getTime());
    const oneDayInMs = TIME_CONSTANTS.MILLISECONDS_PER_DAY;

    if (timeDifference > oneDayInMs) {
      const errorMessage = WEEK_ERROR_MESSAGES.INVALID_WEEK_DATES
        .replace('{week}', nextWeek.weekIndex.toString())
        .replace('{previous}', currentWeek.weekIndex.toString());
      throw new Error(errorMessage);
    }
  }
}