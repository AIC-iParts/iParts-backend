import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { ShopModule } from 'src/shop/shop.module';

@Module({
  providers: [AuthService],
  controllers: [AuthController],
  imports: [ShopModule]
})
export class AuthModule {}
