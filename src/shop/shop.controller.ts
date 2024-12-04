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
  async create(@Body() createShopDto: CreateShopDto) {
    return await this.shopService.create(createShopDto);
  }

  @Get()
  async findAll(): Promise<ReturnShopDto[]> {
    const shops = await this.shopService.findAll();
    return plainToInstance(ReturnShopDto, shops, {
      excludeExtraneousValues: true
    })
  }

  @Get(':id_shop')
  async findOne(@Param('id_shop') id_shop: number) {
    return await this.shopService.findOne(id_shop);
  }

  @Patch(':id')
  async update(@Param('id') id: number, @Body() updateShopDto: UpdateShopDto) {
    return await this.shopService.update(id, updateShopDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    return await this.shopService.remove(id);
  }
}
