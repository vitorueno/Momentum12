import { Module } from '@nestjs/common';

import { HealthModule } from './modules/health/health.module';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [HealthModule, PrismaModule, UserModule, AuthModule],
})
export class AppModule {}
