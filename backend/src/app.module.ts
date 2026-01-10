import { Module } from '@nestjs/common';

import { HealthModule } from './modules/health/health.module';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { CycleModule } from './modules/cycle/cycle.module';
import { WeekModule } from './modules/week/week.module';

@Module({
  imports: [HealthModule, PrismaModule, UserModule, AuthModule, CycleModule, WeekModule],
})
export class AppModule {}
