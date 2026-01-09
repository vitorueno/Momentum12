export class WeekEntity {
  constructor(
    public readonly id: string,
    public readonly cycleId: string,
    public readonly weekIndex: number,
    public readonly startDate: Date,
    public readonly endDate: Date,
    public readonly createdAt: Date,
    public readonly updatedAt: Date,
  ) {}

  getDuration(): number {
    return Math.ceil((this.endDate.getTime() - this.startDate.getTime()) / (1000 * 60 * 60 * 24));
  }

  isCurrentWeek(): boolean {
    const now = new Date();
    return now >= this.startDate && now <= this.endDate;
  }

  belongsToCycle(cycleId: string): boolean {
    return this.cycleId === cycleId;
  }

  static fromPrisma(week: any): WeekEntity {
    return new WeekEntity(
      week.id,
      week.cycleId,
      week.weekIndex,
      week.startDate,
      week.endDate,
      week.createdAt,
      week.updatedAt,
    );
  }
}