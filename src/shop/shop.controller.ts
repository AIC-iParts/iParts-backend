import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ShopService } from './shop.service';  // Certifique-se que o nome do serviço é ShopService
import { CreateShopDto } from './dto/create_shop.dto';
import { UpdateShopDto } from './dto/update_shop.dto';

@Controller('shop')
export class ShopController {
  constructor(private readonly shopService: ShopService) {}

  @Post()
  async create(@Body() createShopDto: CreateShopDto) {
    return await this.shopService.create(createShopDto);
  }

  @Get()
  async findAll() {
    return await this.shopService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return await this.shopService.findOne(id);
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
