import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtModule } from '@nestjs/jwt';
import { ShopModule } from 'src/shop/shop.module';
import { ClientModule } from 'src/client/client.module';

@Module({
  providers: [ProductService, PrismaService],
  controllers: [ProductController],
  exports: [ProductService],
  imports: [JwtModule, ShopModule, ClientModule]
})
export class ProductModule {}
