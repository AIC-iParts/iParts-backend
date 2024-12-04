import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ShopService } from './shop.service';  // Certifique-se que o nome do serviço é ShopService
import { CreateShopDto } from './dto/create_shop.dto';
import { UpdateShopDto } from './dto/update_shop.dto';
import { ReturnShopDto } from './dto/return_shop.dto';
import { plainToInstance } from 'class-transformer';

@Controller('shop')
export class ShopController {
  constructor(private readonly shopService: ShopService) {}

  @Post()
  async createShopController(@Body() createShopDto: CreateShopDto) {
    return await this.shopService.createShopService(createShopDto);
  }

  @Get()
  async getAllShopsController(): Promise<ReturnShopDto[]> {
    const shops = await this.shopService.getAllShopsService();
    return plainToInstance(ReturnShopDto, shops, {
      excludeExtraneousValues: true
    })
  }

  @Get(':id_shop')
  async getShopByIdController(@Param('id_shop') id_shop: number) {
    return await this.shopService.getShopByIdService(id_shop);
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
