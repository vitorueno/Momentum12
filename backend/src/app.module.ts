import { Module } from '@nestjs/common';

import { HealthModule } from './modules/health/health.module';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './modules/user/user.module';

@Module({
  imports: [HealthModule, PrismaModule, UserModule],
})
export class AppModule {}
