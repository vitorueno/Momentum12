import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { PrismaService } from './prisma/prisma.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService, private prisma: PrismaService) {}

  @Get()
  async getHello(): Promise<string> {
    const posts = await this.prisma.post.findMany();
    return this.appService.getHello() + ' - Posts: ' + JSON.stringify(posts);
  }
}
