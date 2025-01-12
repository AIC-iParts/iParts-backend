import { Module } from '@nestjs/common';
import { CountryService } from './country.service';
import { CountryController } from './country.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  providers: [CountryService, PrismaService],
  controllers: [CountryController]
})
export class CountryModule {}
