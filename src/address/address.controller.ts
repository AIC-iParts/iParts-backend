import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CreateAddressDto } from './dto/create_address.dto';
import { AddressService } from './address.service';

@Controller('address')
export class AddressController {

    constructor(private readonly addressService: AddressService) {}

    @Post()
    async createAddressController(@Body() createAddressDto: CreateAddressDto) {
      return await this.addressService.createAddress(createAddressDto);
    }

    @Get(':id_address')
    async getAddressByIdController(@Param('id_address') id_address: number) {
      return await this.addressService.getAddressById(id_address);
    }
}
