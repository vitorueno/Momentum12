export const WEEK_ERROR_MESSAGES = {
  INVALID_DATE_RANGE: 'Start date must be before end date',
  CYCLE_TOO_SHORT: 'Cycle duration must be at least 7 days (1 week)',
  CYCLE_TOO_LONG: 'Cycle duration cannot exceed 365 days',
  INVALID_WEEK_SEQUENCE: 'Week sequence broken: week {current} should be followed by week {expected}',
  INVALID_WEEK_DATES: 'Week {week} start date should be immediately after week {previous} end date',
} as const;