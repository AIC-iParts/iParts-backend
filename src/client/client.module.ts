import { Module } from '@nestjs/common';
import { ClientService } from './client.service';
import { ClientController } from './client.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { GeocodingModule } from 'src/geocoding/geocoding.module';

@Module({
  providers: [ClientService, PrismaService],
  controllers: [ClientController],
  imports: [GeocodingModule]
})
export class ClientModule {}
