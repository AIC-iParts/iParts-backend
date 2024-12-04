import { Module } from '@nestjs/common';
import { ShopService } from './shop.service';
import { ShopController } from './shop.controller';
import { PrismaService } from '../prisma/prisma.service';
import { GeocodingModule } from 'src/geocoding/geocoding.module';

@Module({
  controllers: [ShopController],
  imports: [GeocodingModule],
  providers: [ShopService, PrismaService],
})
export class ShopModule {}
