import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '@/modules/user/user.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async register(dto: RegisterDto) {
    const user = await this.userService.create(dto);

    return this.generateToken(user.id, user.email);
  }

  async login(dto: LoginDto) {
    const user = await this.userService.validateCredentials(
      dto.email,
      dto.password,
    );

    return this.generateToken(user.id, user.email);
  }

  private generateToken(userId: string, email: string) {
    return {
      accessToken: this.jwtService.sign({
        sub: userId,
        email,
      }),
    };
  }
}
