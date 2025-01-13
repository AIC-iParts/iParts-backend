import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { LoginShopDto } from './dto/login_shop.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}
    
    @Post('/loginShop')
    @ApiOperation({summary: 'Login da loja.'})
    async loginShopController(@Body() loginShopDto: LoginShopDto) {
    return await this.authService.loginShop(loginShopDto);
    }
}
