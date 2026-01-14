import { CycleEntity } from '../entities/cycle.entity';
import { ApiProperty } from '@nestjs/swagger';

export class CycleResponseDto {
  @ApiProperty({
    description: 'Unique identifier for the cycle',
    example: '123e4567-e89b-12d3-a456-426614174000',
    format: 'uuid'
  })
  id: string;

  @ApiProperty({
    description: 'User ID who owns this cycle',
    example: '123e4567-e89b-12d3-a456-426614174000',
    format: 'uuid'
  })
  userId: string;

  @ApiProperty({
    description: 'Current status of the cycle',
    example: 'ACTIVE',
    enum: ['ACTIVE', 'COMPLETED']
  })
  status: 'ACTIVE' | 'COMPLETED';

  @ApiProperty({
    description: 'Start date of the cycle',
    example: '2024-01-01T00:00:00.000Z',
    format: 'date-time'
  })
  startDate: Date;

  @ApiProperty({
    description: 'End date of the cycle',
    example: '2024-03-31T00:00:00.000Z',
    format: 'date-time'
  })
  endDate: Date;

  @ApiProperty({
    description: 'Creation timestamp',
    example: '2024-01-01T00:00:00.000Z',
    format: 'date-time'
  })
  createdAt: Date;

  @ApiProperty({
    description: 'Last update timestamp',
    example: '2024-01-01T00:00:00.000Z',
    format: 'date-time'
  })
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