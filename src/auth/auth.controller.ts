import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { LoginShopDto } from './dto/login_shop.dto';
import { AuthService } from './auth.service';
import { LoginClientDto } from './dto/login_client.dto';
import { Public } from 'src/auth/auth.decorator';

@Controller('auth')
@Public()
export class AuthController {
    constructor(private readonly authService: AuthService) {}
    
    @Post('/loginShop')
    @ApiOperation({summary: 'Login da loja.'})
    async loginShopController(@Body() loginShopDto: LoginShopDto) {
    return await this.authService.loginShop(loginShopDto);
    }

    @Post('/loginClient')
    @ApiOperation({summary: 'Login do cliente.'})
    async loginClientController(@Body() loginClientDto: LoginClientDto) {
    return await this.authService.loginClient(loginClientDto);
    }
}
