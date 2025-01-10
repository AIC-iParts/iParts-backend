import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ClientService } from './client.service';
import { CreateClientDto } from './dto/create_client.dto';

@Controller('client')
export class ClientController {
    constructor(private readonly clientService: ClientService) {}

    @Post()
    async createClientController(@Body() createClientDto: CreateClientDto) {
    return await this.clientService.createClient(createClientDto);
    }

    @Get(':id_client')
    async getClientByIdController(@Param('id_client') id_client: number) {
    return await this.clientService.getClientById(id_client);
    } 
}
