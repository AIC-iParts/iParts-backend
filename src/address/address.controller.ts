import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CreateAddressDto } from './dto/create_address.dto';
import { AddressService } from './address.service';
import { ApiOperation } from '@nestjs/swagger';

@Controller('address')
export class AddressController {

    constructor(private readonly addressService: AddressService) {}

    @Post()
    @ApiOperation({summary: 'Cadastra um novo endereço ao usuário.'})
    async createAddressController(@Body() createAddressDto: CreateAddressDto) {
      return await this.addressService.createAddress(createAddressDto);
    }

    @Get(':id_address')
    @ApiOperation({summary: 'Retorna o endereço selcionado.'})
    async getAddressByIdController(@Param('id_address') id_address: number) {
      return await this.addressService.getAddressById(id_address);
    }
}
