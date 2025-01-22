import { Module } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';

import { ShopModule } from './shop/shop.module';
import { CountryModule } from './country/country.module';
import { StateModule } from './state/state.module';
import { CityModule } from './city/city.module';
import { AddressModule } from './address/address.module';
import { CacheModule } from './cache/cache.module';
import { ClientModule } from './client/client.module';
import { AuthModule } from './auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from './auth/roles.guard';
import { JwtModule } from '@nestjs/jwt';
import { AuthGuard } from './auth/auth.guard';
import { ProductModule } from './product/product.module';
import { OrderModule } from './order/order.module';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { AnalyticsModule } from './analytics/analytics.module';

@Module({
  imports: [
    ShopModule, 
    CountryModule, 
    StateModule, 
    CityModule, 
    AddressModule, 
    CacheModule, 
    ClientModule, 
    AuthModule, 
    JwtModule, 
    ProductModule, 
    OrderModule,
    ThrottlerModule.forRoot([{
      ttl: 60000,
      limit: 5,
    }]),
    AnalyticsModule
  ],
  controllers: [],
  providers: [
    PrismaService,
    {
      provide: APP_GUARD,
      useClass: RolesGuard
    },
    {
      provide: APP_GUARD,
      useClass: AuthGuard
    },
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard
    }
  ],
})
export class AppModule {}
