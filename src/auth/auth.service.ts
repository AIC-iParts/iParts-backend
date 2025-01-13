import { Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginShopDto } from 'src/auth/dto/login_shop.dto';
import { ShopService } from 'src/shop/shop.service';
import { compare } from 'bcrypt';
import { plainToInstance } from 'class-transformer';
import { ResponseShopDto } from 'src/shop/dto/response_shop.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        private readonly shopService: ShopService,
        private jwtService: JwtService
    ) {}

    async loginShop(loginShopDto: LoginShopDto) {
        const shop = await this.shopService.getLoginShopInfos(loginShopDto.cnpj)

        if(!shop) {
            throw new UnauthorizedException('Invalid E-mail or Password.');
        }

        const isMatch = await compare(loginShopDto.password, shop.password);
        
        if(!isMatch) {
            throw new UnauthorizedException('Invalid E-mail or Password.');
        }

        const payload = {
            id_shop: shop.id_shop,
            name: shop.name,
            cnpj: shop.cnpj,
            id_city: shop.id_city
        }
        const access_token = await this.jwtService.signAsync(payload)

        return {
            token: access_token,
            shop: plainToInstance(ResponseShopDto, shop, {excludeExtraneousValues: true})
        }
    }
}
