export const DATE_ERROR_MESSAGES = {
  START_DATE_IN_PAST: 'Start date must be in the future',
  START_DATE_AFTER_END: 'Start date must be before end date',
  INVALID_DURATION_WEEKS: 'Duration must be between 1 and 52 weeks',
  INVALID_DATE_RANGE: 'Start date must be before end date',
  CYCLE_TOO_SHORT: 'Cycle duration must be at least 7 days (1 week)',
  CYCLE_TOO_LONG: 'Cycle duration cannot exceed 365 days',
} as const;

export const WEEK_ERROR_MESSAGES = {
  INVALID_DATE_RANGE: 'Start date must be before end date',
  CYCLE_TOO_SHORT: 'Cycle duration must be at least 7 days (1 week)',
  CYCLE_TOO_LONG: 'Cycle duration cannot exceed 365 days',
  INVALID_WEEK_SEQUENCE: 'Week sequence broken: week {current} should be followed by week {expected}',
  INVALID_WEEK_DATES: 'Week {week} start date should be immediately after week {previous} end date',
} as const;