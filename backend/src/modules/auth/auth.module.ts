import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './strategies/jwt.strategy';
import { UserModule } from '@/modules/user/user.module';
import { StringValue } from 'ms';

@Module({
  imports: [
    UserModule,
    PassportModule.register({
      defaultStrategy: 'jwt',
    }),

    JwtModule.register({
      secret: process.env.JWT_SECRET || 'dev-secret',
      signOptions: {
        expiresIn: (process.env.JWT_EXPIRES_IN as StringValue) || '1h',
        issuer: 'momentum12',
        audience: 'momentum12-users',
      },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  exports: [PassportModule],
})
export class AuthModule {}
