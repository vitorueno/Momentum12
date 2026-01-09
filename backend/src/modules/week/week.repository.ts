import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/prisma/prisma.service';
import { WeekEntity } from './entities/week.entity';

export interface WeekData {
  weekIndex: number;
  startDate: Date;
  endDate: Date;
}

export interface WeekCreationData extends WeekData {
  cycleId: string;
}

@Injectable()
export class WeekRepository {
  constructor(private readonly prisma: PrismaService) {}

  async createMany(weeksData: WeekCreationData[]): Promise<void> {
    await this.prisma.week.createMany({
      data: weeksData,
    });
  }

  async createManyWithTransaction(
    weeksData: WeekCreationData[],
    transaction: any,
  ): Promise<void> {
    await transaction.week.createMany({
      data: weeksData,
    });
  }

  async findByCycleId(cycleId: string): Promise<WeekEntity[]> {
    const weeks = await this.prisma.week.findMany({
      where: {
        cycleId,
      },
      orderBy: {
        weekIndex: 'asc',
      },
    });

    return weeks.map((week) => WeekEntity.fromPrisma(week));
  }

  async findByIndex(cycleId: string, weekIndex: number): Promise<WeekEntity | null> {
    const week = await this.prisma.week.findFirst({
      where: {
        cycleId,
        weekIndex,
      },
    });

    return week ? WeekEntity.fromPrisma(week) : null;
  }

  async findCurrentWeek(cycleId: string): Promise<WeekEntity | null> {
    const now = new Date();
    const week = await this.prisma.week.findFirst({
      where: {
        cycleId,
        startDate: {
          lte: now,
        },
        endDate: {
          gte: now,
        },
      },
    });

    return week ? WeekEntity.fromPrisma(week) : null;
  }

  async countByCycleId(cycleId: string): Promise<number> {
    return await this.prisma.week.count({
      where: {
        cycleId,
      },
    });
  }

  async deleteByCycleId(cycleId: string): Promise<void> {
    await this.prisma.week.deleteMany({
      where: {
        cycleId,
      },
    });
  }
}