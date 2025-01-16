import { Module } from '@nestjs/common';
import { ShopService } from './shop.service';
import { ShopController } from './shop.controller';
import { PrismaService } from '../prisma/prisma.service';
import { GeocodingModule } from 'src/geocoding/geocoding.module';
import { CityModule } from 'src/city/city.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  controllers: [ShopController],
  imports: [GeocodingModule, CityModule, JwtModule],
  providers: [ShopService, PrismaService],
  exports: [ShopService]
})
export class ShopModule {}
