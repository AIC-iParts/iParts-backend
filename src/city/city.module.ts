import { Module } from '@nestjs/common';
import { CacheModule } from '@nestjs/cache-manager';
import { CityService } from './city.service';
import { CityController } from './city.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  imports: [CacheModule.register({
    ttl: 0
  })],
  controllers: [CityController],
  providers: [CityService, PrismaService]
})
export class CityModule {}
