import {
  Body,
  Controller,
  Post,
  Get,
  Param,
  NotFoundException,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user-dto';
import { UserResponseDto } from './dto/user-response.dto';
import { JwtAuthGuard } from '@/modules/auth/guards/jwt-auth.guard';
import { CurrentUser } from '@/modules/auth/decorators/current-user.decorator';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body() dto: CreateUserDto): Promise<UserResponseDto> {
    const user = await this.userService.create(dto);
    return UserResponseDto.fromEntity(user);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  async findAll(): Promise<UserResponseDto[]> {
    const users = await this.userService.findAll();
    return users.map(UserResponseDto.fromEntity);
  }

  @Get('me')
  @UseGuards(JwtAuthGuard)
  getMe(@CurrentUser() user: { userId: string; email: string }) {
    return {
      id: user.userId,
      email: user.email,
    };
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  async findById(@Param('id') id: string): Promise<UserResponseDto> {
    const user = await this.userService.findById(id);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return UserResponseDto.fromEntity(user);
  }
}
