import { Module } from '@nestjs/common';
import { AddressService } from './address.service';
import { PrismaService } from '../prisma/prisma.service';
import { GeocodingModule } from 'src/geocoding/geocoding.module';
import { AddressController } from './address.controller';
import { ClientModule } from 'src/client/client.module';
import { CityModule } from 'src/city/city.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  controllers: [AddressController],
  imports: [GeocodingModule, ClientModule, CityModule, JwtModule],
  providers: [AddressService, PrismaService]
})
export class AddressModule {}
