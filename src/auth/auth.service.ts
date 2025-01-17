import { Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginShopDto } from 'src/auth/dto/login_shop.dto';
import { ShopService } from 'src/shop/shop.service';
import { compare } from 'bcrypt';
import { plainToInstance } from 'class-transformer';
import { ResponseShopDto } from 'src/shop/dto/response_shop.dto';
import { JwtService } from '@nestjs/jwt';
import { LoginShopPayload, LoginClientPayload } from './dto/login_payload.dto';
import { LoginClientDto } from './dto/login_client.dto';
import { ResponseClientDto } from 'src/client/dto/response_client.dto';
import { ClientService } from 'src/client/client.service';

@Injectable()
export class AuthService {
    constructor(
        private readonly shopService: ShopService,
        private readonly clientService: ClientService,
        private jwtService: JwtService
    ) {}

    async loginShop(loginShopDto: LoginShopDto) {
        const shop = await this.shopService.getLoginShopInfos(loginShopDto.cnpj)

        if(!shop) {
            throw new UnauthorizedException('Invalid CNPJ or Password.');
        }

        const isMatch = await compare(loginShopDto.password, shop.password);
        
        if(!isMatch) {
            throw new UnauthorizedException('Invalid CNPJ or Password.');
        }

        const payload: LoginShopPayload = {
            id: shop.id,
            name: shop.name,
            type_user: shop.type_user,
            id_city: shop.id_city
        }

        return {
            accessToken: await this.jwtService.signAsync(payload),
            shop: plainToInstance(ResponseShopDto, shop, {excludeExtraneousValues: true})
        }
    }

    async loginClient(loginClientDto: LoginClientDto) {
        const client = await this.clientService.getLoginClientInfos(loginClientDto.cpf)

        if(!client) {
            throw new UnauthorizedException('Invalid CPF or Password.');
        }

        const isMatch = await compare(loginClientDto.password, client.password);
        
        if(!isMatch) {
            throw new UnauthorizedException('Invalid CPF or Password.');
        }

        const payload: LoginClientPayload = {
            id: client.id,
            name: client.name,
            type_user: client.type_user
        }

        return {
            accessToken: await this.jwtService.signAsync(payload),
            shop: plainToInstance(ResponseClientDto, client, {excludeExtraneousValues: true})
        }
    }
}
