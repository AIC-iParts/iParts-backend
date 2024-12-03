import { Module } from '@nestjs/common';
import { AddressService } from './address.service';
import { PrismaService } from '../prisma/prisma.service';
import { GeocodingService } from 'src/geocoding/geocoding.service';
import { AddressController } from './address.controller';

@Module({
  controllers: [AddressController],
  providers: [AddressService, PrismaService, GeocodingService]
})
export class AddressModule {}
