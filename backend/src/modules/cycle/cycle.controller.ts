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
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiParam, ApiBody } from '@nestjs/swagger';
import { CycleService } from './cycle.service';
import { CreateCycleDto } from './dto/create-cycle.dto';
import { UpdateCycleDto } from './dto/update-cycle.dto';
import { CycleResponseDto } from './dto/cycle-response.dto';
import { JwtAuthGuard } from '@/modules/auth/guards/jwt-auth.guard';
import { CurrentUser } from '@/modules/auth/decorators/current-user.decorator';
import type { CurrentUserPayload } from '@/types';

@ApiTags('Cycles')
@ApiBearerAuth()
@Controller('cycles')
@UseGuards(JwtAuthGuard)
export class CycleController {
  constructor(private readonly cycleService: CycleService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new cycle' })
  @ApiResponse({ status: 201, description: 'Cycle successfully created', type: CycleResponseDto })
  @ApiResponse({ status: 400, description: 'Bad Request - Invalid input' })
  @ApiResponse({ status: 401, description: 'Unauthorized - JWT token required' })
  @ApiBody({ type: CreateCycleDto })
  async create(
    @Body() dto: CreateCycleDto,
    @CurrentUser() user: CurrentUserPayload,
  ): Promise<CycleResponseDto> {
    const cycle = await this.cycleService.create(dto, user.userId);
    return CycleResponseDto.fromEntity(cycle);
  }

  @Get()
  @ApiOperation({ summary: 'Get all cycles for current user' })
  @ApiResponse({ status: 200, description: 'List of cycles', type: [CycleResponseDto] })
  @ApiResponse({ status: 401, description: 'Unauthorized - JWT token required' })
  async findAll(
    @CurrentUser() user: CurrentUserPayload,
  ): Promise<CycleResponseDto[]> {
    const cycles = await this.cycleService.findAll(user.userId);
    return cycles.map(CycleResponseDto.fromEntity);
  }

  @Get('active')
  @ApiOperation({ summary: 'Get active cycle for current user' })
  @ApiResponse({ status: 200, description: 'Active cycle or null', type: CycleResponseDto })
  @ApiResponse({ status: 401, description: 'Unauthorized - JWT token required' })
  async findActive(
    @CurrentUser() user: CurrentUserPayload,
  ): Promise<CycleResponseDto | null> {
    const cycle = await this.cycleService.findActive(user.userId);
    return cycle ? CycleResponseDto.fromEntity(cycle) : null;
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get cycle by ID' })
  @ApiResponse({ status: 200, description: 'Cycle details', type: CycleResponseDto })
  @ApiResponse({ status: 401, description: 'Unauthorized - JWT token required' })
  @ApiResponse({ status: 404, description: 'Cycle not found' })
  @ApiParam({ name: 'id', description: 'Cycle ID', format: 'uuid' })
  async findById(
    @Param('id', ParseUUIDPipe) id: string,
    @CurrentUser() user: CurrentUserPayload,
  ): Promise<CycleResponseDto> {
    const cycle = await this.cycleService.findById(id, user.userId);
    return CycleResponseDto.fromEntity(cycle);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update cycle by ID' })
  @ApiResponse({ status: 200, description: 'Updated cycle', type: CycleResponseDto })
  @ApiResponse({ status: 401, description: 'Unauthorized - JWT token required' })
  @ApiResponse({ status: 404, description: 'Cycle not found' })
  @ApiParam({ name: 'id', description: 'Cycle ID', format: 'uuid' })
  @ApiBody({ type: UpdateCycleDto })
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: UpdateCycleDto,
    @CurrentUser() user: CurrentUserPayload,
  ): Promise<CycleResponseDto> {
    const cycle = await this.cycleService.update(id, dto, user.userId);
    return CycleResponseDto.fromEntity(cycle);
  }

  @Post(':id/complete')
  @ApiOperation({ summary: 'Complete cycle by ID' })
  @ApiResponse({ status: 200, description: 'Completed cycle', type: CycleResponseDto })
  @ApiResponse({ status: 401, description: 'Unauthorized - JWT token required' })
  @ApiResponse({ status: 404, description: 'Cycle not found' })
  @ApiParam({ name: 'id', description: 'Cycle ID', format: 'uuid' })
  async complete(
    @Param('id', ParseUUIDPipe) id: string,
    @CurrentUser() user: CurrentUserPayload,
  ): Promise<CycleResponseDto> {
    const cycle = await this.cycleService.complete(id, user.userId);
    return CycleResponseDto.fromEntity(cycle);
  }
}