// src/prisma.service.ts
import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '../../generated/prisma/client';
// Import the appropriate adapter
import { PrismaPg } from '@prisma/adapter-pg'; 
import * as dotenv from 'dotenv';

dotenv.config(); // Ensure environment variables are loaded

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  constructor() {
    // Instantiate the adapter with the connection string
    const adapter = new PrismaPg({
      connectionString: process.env.DATABASE_URL,
    });
    // Pass the adapter to the PrismaClient constructor
    super({ adapter }); 
  }

  async onModuleInit() {
    await this.$connect();
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }
}
