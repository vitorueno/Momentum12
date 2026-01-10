import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/prisma/prisma.service';
import { CycleEntity } from '../entities/cycle.entity';

@Injectable()
export class CycleQueryService {
  constructor(private readonly prisma: PrismaService) {}

  async findById(id: string, userId: string): Promise<CycleEntity | null> {
    const cycle = await this.prisma.cycle.findUnique({
      where: { id },
    });

    if (!cycle) {
      return null;
    }

    if (cycle.userId !== userId) {
      return null;
    }

    return CycleEntity.fromPrisma(cycle);
  }

  async findActive(userId: string): Promise<CycleEntity | null> {
    const cycle = await this.prisma.cycle.findFirst({
      where: {
        userId,
        status: 'ACTIVE',
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return cycle ? CycleEntity.fromPrisma(cycle) : null;
  }

  async findAll(userId: string): Promise<CycleEntity[]> {
    const cycles = await this.prisma.cycle.findMany({
      where: {
        userId,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return cycles.map((cycle) => CycleEntity.fromPrisma(cycle));
  }
}