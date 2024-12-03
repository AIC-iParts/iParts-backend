import { Module } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';

import { ShopModule } from './shop/shop.module';
import { CountryModule } from './country/country.module';
import { StateModule } from './state/state.module';
import { CityModule } from './city/city.module';
import { AddressModule } from './address/address.module';

@Module({
  imports: [ShopModule, CountryModule, StateModule, CityModule, AddressModule],
  controllers: [],
  providers: [PrismaService],
})
export class AppModule {}
