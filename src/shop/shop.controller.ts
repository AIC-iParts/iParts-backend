import { Controller, Get, Post, Body, Patch, Param, Delete, Req } from '@nestjs/common';
import { ShopService } from './shop.service';
import { CreateShopDto } from './dto/create_shop.dto';
import { UpdateShopDto } from './dto/update_shop.dto';
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
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
  @ApiBearerAuth()
  @ApiOperation({summary: 'Retorna todas as lojas.'})
  async getAllShopsController() {
    return await this.shopService.getAllShopsService();
  }

  @Get('/getShopById/:id_shop')
  @ApiBearerAuth()
  @ApiOperation({summary: 'Retorna a loja selecionada.'})
  async getShopByIdController(@Param('id_shop') id_shop: number) {
    return await this.shopService.getShopByIdService(id_shop);
  }

  @Get('/getShopByCnpj/:cnpj')
  @ApiBearerAuth()
  @ApiOperation({summary: 'Retorna a loja selecionada.'})
  async getShopByCnpjController(@Param('cnpj') cnpj: string) {
    return await this.shopService.getShopByCnpjService(cnpj);
  }

  @Get('/getAllShopsByCityId/:id_city')
  @ApiBearerAuth()
  @ApiOperation({summary: 'Retorna todas as lojas da cidade selecionada.'})
  async getAllShopsByCityIdController(@Param('id_city') id_city: number) {
    return await this.shopService.getAllShopsByCityIdService(id_city);
  }

  @Patch()
  @Roles(UserType.Shop)
  @ApiBearerAuth()
  @ApiOperation({summary: 'Atualiza a loja selecionada.'})
  async updateShopController(@Req() request: Request, @Body() updateShopDto: UpdateShopDto) {
    return await this.shopService.updateShopService(updateShopDto, request);
  }

  @Patch('/setShopOpenedStatus/:status')
  @Roles(UserType.Shop)
  @ApiBearerAuth()
  @ApiOperation({summary: 'Atualiza o status aberto/fechado da loja.'})
  async setShopOpenedStatusController(@Req() request: Request, @Param('status') status: boolean) {
    return await this.shopService.setShopOpnenedStatus(request=request, status=status);
  }

  @Delete()
  @Roles(UserType.Shop)
  @ApiBearerAuth()
  @ApiOperation({summary: 'Deleta a loja selecionada.'})
  async deleteShopController(@Req() request: Request) {
    return await this.shopService.deleteShopService(request);
  }
}
