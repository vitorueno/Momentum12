import { Body, Controller, Post, Get, Param, NotFoundException } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user-dto';
import { UserResponseDto } from './dto/user-response.dto';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService){}

    @Post()
    async create(@Body() dto: CreateUserDto): Promise<UserResponseDto> {
        const user = await this.userService.create(dto);
        return UserResponseDto.fromEntity(user);
    }

    @Get()
    async findAll(): Promise<UserResponseDto[]> {
        const users = await this.userService.findAll();
        return users.map(UserResponseDto.fromEntity);
    }

    @Get(':id')
    async findById(@Param('id') id: string): Promise<UserResponseDto> {
        const user = await this.userService.findById(id);

         if (!user) {
            throw new NotFoundException('User not found');
        }

        return UserResponseDto.fromEntity(user);
    }
}