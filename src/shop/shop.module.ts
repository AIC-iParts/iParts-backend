import { Module } from '@nestjs/common';
import { ShopService } from './shop.service';
import { ShopController } from './shop.controller';
import { PrismaService } from '../prisma/prisma.service';
import { GeocodingModule } from 'src/geocoding/geocoding.module';
import { CityModule } from 'src/city/city.module';

@Module({
  controllers: [ShopController],
  imports: [GeocodingModule, CityModule],
  providers: [ShopService, PrismaService],
})
export class ShopModule {}
