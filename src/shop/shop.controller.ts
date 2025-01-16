import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ShopService } from './shop.service';
import { CreateShopDto } from './dto/create_shop.dto';
import { UpdateShopDto } from './dto/update_shop.dto';
import { ApiOperation } from '@nestjs/swagger';
import { Public } from 'src/auth/auth.decorator';
import { UserType } from 'src/auth/user_type.enum';
import { Roles } from 'src/auth/roles.decorator';

@Controller('shop')
export class ShopController {
  constructor(private readonly shopService: ShopService) {}

  @Post()
  @Public()
  @ApiOperation({summary: 'Cadastra uma nova loja.'})
  async createShopController(@Body() createShopDto: CreateShopDto) {
    return await this.shopService.createShopService(createShopDto);
  }

  @Get()
  @ApiOperation({summary: 'Retorna todas as lojas.'})
  async getAllShopsController() {
    return await this.shopService.getAllShopsService();
  }

  @Get('/getShopById/:id_shop')
  @ApiOperation({summary: 'Retorna a loja selecionada.'})
  async getShopByIdController(@Param('id_shop') id_shop: number) {
    return await this.shopService.getShopByIdService(id_shop);
  }

  @Get('/getShopByCnpj/:cnpj')
  @ApiOperation({summary: 'Retorna a loja selecionada.'})
  async getShopByCnpjController(@Param('cnpj') cnpj: string) {
    return await this.shopService.getShopByCnpjService(cnpj);
  }

  @Get('/getAllShopsByCityId/:id_city')
  @ApiOperation({summary: 'Retorna todas as lojas da cidade selecionada.'})
  async getAllShopsByCityIdController(@Param('id_city') id_city: number) {
    return await this.shopService.getAllShopsByCityIdService(id_city);
  }

  @Patch(':id_shop')
  @Roles(UserType.Shop)
  @ApiOperation({summary: 'Atualiza a loja selecionada.'})
  async updateShopController(@Param('id_shop') id_shop: number, @Body() updateShopDto: UpdateShopDto) {
    return await this.shopService.updateShopService(id_shop, updateShopDto);
  }

  @Delete(':id_shop')
  @Roles(UserType.Shop)
  @ApiOperation({summary: 'Deleta a loja selecionada.'})
  async deleteShopController(@Param('id_shop') id_shop: number) {
    return await this.shopService.deleteShopService(id_shop);
  }
}
