import { Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginShopDto } from 'src/shop/dto/login_shop.dto';
import { ShopService } from 'src/shop/shop.service';
import { compare } from 'bcrypt';
import { plainToInstance } from 'class-transformer';
import { ResponseShopDto } from 'src/shop/dto/response_shop.dto';

@Injectable()
export class AuthService {
    constructor(private readonly shopService: ShopService) {}

    async loginShop(loginShopDto: LoginShopDto) {
        const shop = await this.shopService.getLoginShopInfos(loginShopDto.cnpj)

        if(!shop) {
            throw new UnauthorizedException('Invalid E-mail or Password.');
        }

        const isMatch = await compare(loginShopDto.password, shop.password);
        
        if(!isMatch) {
            throw new UnauthorizedException('Invalid E-mail or Password.');
        }

        return plainToInstance(ResponseShopDto, shop, {excludeExtraneousValues: true})
    }
}
