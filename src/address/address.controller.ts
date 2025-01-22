import { Controller, Get, Post, Body, Patch, Param, Delete, Req } from '@nestjs/common';
import { CreateAddressDto } from './dto/create_address.dto';
import { AddressService } from './address.service';
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { Roles } from 'src/auth/roles.decorator';
import { UserType } from 'src/auth/user_type.enum';
import { UpdateAddressDto } from './dto/update_address.dto';

@ApiBearerAuth()
@Controller('address')
export class AddressController {

    constructor(private readonly addressService: AddressService) {}

    @Post()
    @Roles(UserType.Client)
    @ApiOperation({summary: 'Cadastra um novo endereço ao usuário.'})
    async createAddressController(@Req() request: Request, @Body() createAddressDto: CreateAddressDto) {
      return await this.addressService.createAddress(createAddressDto, request);
    }

    @Get(':id_address')
    @ApiOperation({summary: 'Retorna o endereço selecionado.'})
    async getAddressByIdController(@Param('id_address') id_address: number) {
      return await this.addressService.getAddressById(id_address);
    }

    @Patch()
    @Roles(UserType.Client)
    @ApiBearerAuth()
    @ApiOperation({summary: 'Atualiza o endereço selecionado.'})
    async updateAddressController(@Req() request: Request, @Body() updateAddressDto: UpdateAddressDto) {
        return
    }

    @Delete()
    @Roles(UserType.Client)
    @ApiBearerAuth()
    @ApiOperation({summary: 'Deleta o endereço selecionado.'})
    async deleteAddressController(@Req() request: Request) {
      return
    }
}
