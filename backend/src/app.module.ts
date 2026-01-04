import { Module } from '@nestjs/common';

import { HealthModule } from './modules/health/health.module';
import { PrismaModule } from './prisma/prisma.module';
import { PrismaService } from './prisma/prisma.service';

@Module({
  imports: [HealthModule, PrismaModule],
  controllers: [],
  providers: [PrismaService],
})
export class AppModule {}
