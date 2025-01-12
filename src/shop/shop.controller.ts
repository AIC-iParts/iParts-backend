import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ShopService } from './shop.service';  // Certifique-se que o nome do serviço é ShopService
import { CreateShopDto } from './dto/create_shop.dto';
import { UpdateShopDto } from './dto/update_shop.dto';
import { ApiOperation } from '@nestjs/swagger';

@Controller('shop')
export class ShopController {
  constructor(private readonly shopService: ShopService) {}

  @Post()
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

  @Get('/getAllShopsByCityId/:id_city')
  @ApiOperation({summary: 'Retorna todas as lojas da cidade selecionada.'})
  async getAllShopsByCityIdController(@Param('id_city') id_city: number) {
    return await this.shopService.getAllShopsByCityIdService(id_city);
  }

  @Patch(':id_shop')
  @ApiOperation({summary: 'Atualiza a loja selecionada.'})
  async updateShopController(@Param('id_shop') id_shop: number, @Body() updateShopDto: UpdateShopDto) {
    return await this.shopService.updateShopService(id_shop, updateShopDto);
  }

  @Delete(':id_shop')
  @ApiOperation({summary: 'Deleta a loja selecionada.'})
  async deleteShopController(@Param('id_shop') id_shop: number) {
    return await this.shopService.deleteShopService(id_shop);
  }
}
