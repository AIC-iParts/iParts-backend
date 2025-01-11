import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ShopService } from './shop.service';  // Certifique-se que o nome do serviço é ShopService
import { CreateShopDto } from './dto/create_shop.dto';
import { UpdateShopDto } from './dto/update_shop.dto';

@Controller('shop')
export class ShopController {
  constructor(private readonly shopService: ShopService) {}

  @Post()
  async createShopController(@Body() createShopDto: CreateShopDto) {
    return await this.shopService.createShopService(createShopDto);
  }

  @Get()
  async getAllShopsController() {
    return await this.shopService.getAllShopsService();
  }

  @Get('/getShopById/:id_shop')
  async getShopByIdController(@Param('id_shop') id_shop: number) {
    return await this.shopService.getShopByIdService(id_shop);
  }

  @Get('/getAllShopsByCityId/:id_city')
  async getAllShopsByCityIdController(@Param('id_city') id_city: number) {
    return await this.shopService.getAllShopsByCityIdService(id_city);
  }

  @Patch(':id')
  async updateShopController(@Param('id') id: number, @Body() updateShopDto: UpdateShopDto) {
    return await this.shopService.updateShopService(id, updateShopDto);
  }

  @Delete(':id')
  async deleteShopController(@Param('id') id: number) {
    return await this.shopService.deleteShopService(id);
  }
}
