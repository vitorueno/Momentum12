import {
  Body,
  Controller,
  Post,
  Get,
  Param,
  NotFoundException,
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiParam, ApiBody } from '@nestjs/swagger';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user-dto';
import { UserResponseDto } from './dto/user-response.dto';
import { JwtAuthGuard } from '@/modules/auth/guards/jwt-auth.guard';
import { CurrentUser } from '@/modules/auth/decorators/current-user.decorator';
import type { CurrentUserPayload } from '@/types';

@ApiTags('Users')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new user' })
  @ApiResponse({ status: 201, description: 'User successfully created', type: UserResponseDto })
  @ApiResponse({ status: 400, description: 'Bad Request - Invalid input' })
  @ApiBody({ type: CreateUserDto })
  async create(@Body() dto: CreateUserDto): Promise<UserResponseDto> {
    const user = await this.userService.create(dto);
    return UserResponseDto.fromEntity(user);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({ status: 200, description: 'List of users', type: [UserResponseDto] })
  @ApiResponse({ status: 401, description: 'Unauthorized - JWT token required' })
  async findAll(): Promise<UserResponseDto[]> {
    const users = await this.userService.findAll();
    return users.map(UserResponseDto.fromEntity);
  }

  @Get('me')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get current user profile' })
  @ApiResponse({ status: 200, description: 'Current user profile', schema: {
    example: {
      id: '123e4567-e89b-12d3-a456-426614174000',
      email: 'user@example.com'
    }
  }})
  @ApiResponse({ status: 401, description: 'Unauthorized - JWT token required' })
  getMe(@CurrentUser() user: CurrentUserPayload) {
    return {
      id: user.userId,
      email: user.email,
    };
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get user by ID' })
  @ApiResponse({ status: 200, description: 'User details', type: UserResponseDto })
  @ApiResponse({ status: 401, description: 'Unauthorized - JWT token required' })
  @ApiResponse({ status: 404, description: 'User not found' })
  @ApiParam({ name: 'id', description: 'User ID', format: 'uuid' })
  async findById(@Param('id') id: string): Promise<UserResponseDto> {
    const user = await this.userService.findById(id);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return UserResponseDto.fromEntity(user);
  }
}
