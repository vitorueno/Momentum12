import { TIME_CONSTANTS } from '../constants/time.constants';

export class DateCalculationUtil {
  static calculateEndDate(startDate: Date, durationInWeeks: number): Date {
    const endDate = new Date(startDate);
    endDate.setDate(endDate.getDate() + durationInWeeks * TIME_CONSTANTS.DAYS_PER_WEEK);
    return endDate;
  }

  static calculateDurationInDays(startDate: Date, endDate: Date): number {
    const durationMs = endDate.getTime() - startDate.getTime();
    return Math.ceil(durationMs / TIME_CONSTANTS.MILLISECONDS_PER_DAY);
  }

  static calculateDurationInWeeks(startDate: Date, endDate: Date): number {
    const durationInDays = this.calculateDurationInDays(startDate, endDate);
    return Math.ceil(durationInDays / TIME_CONSTANTS.DAYS_PER_WEEK);
  }
}