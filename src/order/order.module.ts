import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { ProductModule } from 'src/product/product.module';
import { ShopModule } from 'src/shop/shop.module';
import { ClientModule } from 'src/client/client.module';

@Module({
  providers: [OrderService],
  controllers: [OrderController],
  exports: [OrderService],
  imports: [ProductModule, ShopModule, ClientModule]
})

export class OrderModule {}
