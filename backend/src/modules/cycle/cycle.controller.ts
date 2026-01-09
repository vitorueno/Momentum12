import {
  Controller,
  Get,
  Post,
  Patch,
  Param,
  Body,
  UseGuards,
  ParseUUIDPipe,
} from '@nestjs/common';
import { CycleService } from './cycle.service';
import { CreateCycleDto } from './dto/create-cycle.dto';
import { UpdateCycleDto } from './dto/update-cycle.dto';
import { CycleResponseDto } from './dto/cycle-response.dto';
import { JwtAuthGuard } from '@/modules/auth/guards/jwt-auth.guard';
import { CurrentUser } from '@/modules/auth/decorators/current-user.decorator';
import type { CurrentUserPayload } from '@/types';

@Controller('cycles')
@UseGuards(JwtAuthGuard)
export class CycleController {
  constructor(private readonly cycleService: CycleService) {}

  @Post()
  async create(
    @Body() dto: CreateCycleDto,
    @CurrentUser() user: CurrentUserPayload,
  ): Promise<CycleResponseDto> {
    const cycle = await this.cycleService.create(dto, user.userId);
    return CycleResponseDto.fromEntity(cycle);
  }

  @Get()
  async findAll(
    @CurrentUser() user: CurrentUserPayload,
  ): Promise<CycleResponseDto[]> {
    const cycles = await this.cycleService.findAll(user.userId);
    return cycles.map(CycleResponseDto.fromEntity);
  }

  @Get('active')
  async findActive(
    @CurrentUser() user: CurrentUserPayload,
  ): Promise<CycleResponseDto | null> {
    const cycle = await this.cycleService.findActive(user.userId);
    return cycle ? CycleResponseDto.fromEntity(cycle) : null;
  }

  @Get(':id')
  async findById(
    @Param('id', ParseUUIDPipe) id: string,
    @CurrentUser() user: CurrentUserPayload,
  ): Promise<CycleResponseDto> {
    const cycle = await this.cycleService.findById(id, user.userId);
    return CycleResponseDto.fromEntity(cycle);
  }

  @Patch(':id')
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: UpdateCycleDto,
    @CurrentUser() user: CurrentUserPayload,
  ): Promise<CycleResponseDto> {
    const cycle = await this.cycleService.update(id, dto, user.userId);
    return CycleResponseDto.fromEntity(cycle);
  }

  @Post(':id/complete')
  async complete(
    @Param('id', ParseUUIDPipe) id: string,
    @CurrentUser() user: CurrentUserPayload,
  ): Promise<CycleResponseDto> {
    const cycle = await this.cycleService.complete(id, user.userId);
    return CycleResponseDto.fromEntity(cycle);
  }
}