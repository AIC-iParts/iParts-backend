import { Module } from '@nestjs/common';
import { CityService } from './city.service';
import { CityController } from './city.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { CacheModule } from 'src/cache/cache.module';

@Module({
  imports: [CacheModule],
  controllers: [CityController],
  providers: [CityService, PrismaService],
  exports: [CityService]
})
export class CityModule {}
