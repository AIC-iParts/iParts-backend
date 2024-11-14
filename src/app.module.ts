import { Module } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';

import { ShopModule } from './shop/shop.module';

@Module({
  imports: [ShopModule],
  controllers: [],
  providers: [PrismaService],
})
export class AppModule {}
