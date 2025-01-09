import { Module } from '@nestjs/common';
import { AddressService } from './address.service';
import { PrismaService } from '../prisma/prisma.service';
import { GeocodingModule } from 'src/geocoding/geocoding.module';
import { AddressController } from './address.controller';
import { ClientModule } from 'src/client/client.module';

@Module({
  controllers: [AddressController],
  imports: [GeocodingModule, ClientModule],
  providers: [AddressService, PrismaService]
})
export class AddressModule {}
