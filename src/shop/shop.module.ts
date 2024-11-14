import { Module } from '@nestjs/common';
import { ShopService } from './shop.service';
import { ShopController } from './shop.controller';
import { PrismaService } from '../prisma/prisma.service';
import { GeocodingService } from 'src/geocoding/geocoding.service';

@Module({
  controllers: [ShopController],
  providers: [ShopService, PrismaService, GeocodingService],
})
export class ShopModule {}
