export class CycleEntity {
  constructor(
    public readonly id: string,
    public readonly userId: string,
    public readonly status: 'ACTIVE' | 'COMPLETED',
    public readonly startDate: Date,
    public readonly endDate: Date,
    public readonly createdAt: Date,
    public readonly updatedAt: Date,
  ) {}

  isActive(): boolean {
    return this.status === 'ACTIVE';
  }

  isCompleted(): boolean {
    return this.status === 'COMPLETED';
  }

  isOwnedBy(userId: string): boolean {
    return this.userId === userId;
  }

  static fromPrisma(cycle: any): CycleEntity {
    return new CycleEntity(
      cycle.id,
      cycle.userId,
      cycle.status,
      cycle.startDate,
      cycle.endDate,
      cycle.createdAt,
      cycle.updatedAt,
    );
  }
}