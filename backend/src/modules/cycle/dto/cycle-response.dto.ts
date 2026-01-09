import { CycleEntity } from '../entities/cycle.entity';

export class CycleResponseDto {
  id: string;
  userId: string;
  status: 'ACTIVE' | 'COMPLETED';
  startDate: Date;
  endDate: Date;
  createdAt: Date;
  updatedAt: Date;

  static fromEntity(entity: CycleEntity) {
    return {
      id: entity.id,
      userId: entity.userId,
      status: entity.status,
      startDate: entity.startDate,
      endDate: entity.endDate,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    };
  }
}