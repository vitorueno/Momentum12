import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CycleEntity } from './entities/cycle.entity';
import { CreateCycleDto } from './dto/create-cycle.dto';
import { UpdateCycleDto } from './dto/update-cycle.dto';
import { CycleCreationService } from './services/cycle-creation.service';
import { CycleUpdateService } from './services/cycle-update.service';
import { CycleQueryService } from './services/cycle-query.service';

@Injectable()
export class CycleService {
  constructor(
    private readonly creationService: CycleCreationService,
    private readonly updateService: CycleUpdateService,
    private readonly queryService: CycleQueryService,
  ) {}

  async create(dto: CreateCycleDto, userId: string): Promise<CycleEntity> {
    return await this.creationService.createCycleWithWeeks(dto, userId);
  }

  async findById(id: string, userId: string): Promise<CycleEntity> {
    const cycle = await this.queryService.findById(id, userId);
    
    if (!cycle) {
      throw new NotFoundException('Cycle not found');
    }
    
    return cycle;
  }

  async findActive(userId: string): Promise<CycleEntity | null> {
    return await this.queryService.findActive(userId);
  }

  async findAll(userId: string): Promise<CycleEntity[]> {
    return await this.queryService.findAll(userId);
  }

  async update(id: string, dto: UpdateCycleDto, userId: string): Promise<CycleEntity> {
    return await this.updateService.updateCycleWithWeeks(id, dto, userId);
  }

  async complete(id: string, userId: string): Promise<CycleEntity> {
    return await this.updateService.completeCycle(id, userId);
  }
}