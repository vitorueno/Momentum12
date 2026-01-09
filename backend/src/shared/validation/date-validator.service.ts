import { Injectable } from '@nestjs/common';
import { DATE_CONSTANTS, TIME_CONSTANTS } from '../constants/time.constants';
import { DATE_ERROR_MESSAGES } from '../constants/error.constants';

@Injectable()
export class DateValidatorService {
  validateDateRange(startDate: Date, endDate: Date): void {
    if (startDate >= endDate) {
      throw new Error(DATE_ERROR_MESSAGES.INVALID_DATE_RANGE);
    }

    this.validateCycleDuration(startDate, endDate);
  }

  validateFutureDate(date: Date): void {
    const now = new Date();
    const dateToValidate = new Date(date);

    if (dateToValidate <= now) {
      throw new Error(DATE_ERROR_MESSAGES.START_DATE_IN_PAST);
    }
  }

  validateDurationInWeeks(weeks: number): void {
    if (weeks < DATE_CONSTANTS.MIN_WEEKS || weeks > DATE_CONSTANTS.MAX_WEEKS) {
      throw new Error(DATE_ERROR_MESSAGES.INVALID_DURATION_WEEKS);
    }
  }

  validateCycleDuration(startDate: Date, endDate: Date): void {
    const durationMs = endDate.getTime() - startDate.getTime();
    const durationDays = Math.ceil(durationMs / TIME_CONSTANTS.MILLISECONDS_PER_DAY);
    
    if (durationDays > DATE_CONSTANTS.DAYS_IN_YEAR) {
      throw new Error(DATE_ERROR_MESSAGES.CYCLE_TOO_LONG);
    }

    if (durationDays < DATE_CONSTANTS.MIN_DURATION_DAYS) {
      throw new Error(DATE_ERROR_MESSAGES.CYCLE_TOO_SHORT);
    }
  }

  validateUpdateDates(startDate?: Date, endDate?: Date): void {
    if (startDate && endDate) {
      this.validateDateRange(startDate, endDate);
    }
  }

  validateCreationDate(startDate: Date, durationInWeeks?: number): void {
    this.validateFutureDate(startDate);
    
    if (durationInWeeks) {
      this.validateDurationInWeeks(durationInWeeks);
    }
  }
}