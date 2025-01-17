import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ClientService } from './client.service';
import { CreateClientDto } from './dto/create_client.dto';
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { Public } from 'src/auth/auth.decorator';

@Controller('client')
export class ClientController {
    constructor(private readonly clientService: ClientService) {}

    @Post()
    @Public()
    @ApiOperation({summary: 'Cadastra um novo cliente.'})
    async createClientController(@Body() createClientDto: CreateClientDto) {
    return await this.clientService.createClient(createClientDto);
    }

    @Get(':id_client')
    @ApiBearerAuth()
    @ApiOperation({summary: 'Retorna o cliente selecionado.'})
    async getClientByIdController(@Param('id_client') id_client: number) {
    return await this.clientService.getClientById(id_client);
    } 
}
