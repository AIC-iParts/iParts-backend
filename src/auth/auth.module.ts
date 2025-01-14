import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { ShopModule } from 'src/shop/shop.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  providers: [AuthService],
  controllers: [AuthController],
  imports: [
    ShopModule,
    JwtModule.register({
        secret: process.env.JWT_SECRET,
        signOptions: { expiresIn: process.env.JWT_EXPIRES_IN },
      }),
    ]
  })

export class AuthModule {}
