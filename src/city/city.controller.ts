import { Controller, Get, Param } from '@nestjs/common';
import { CityService } from './city.service';
import { ApiOperation } from '@nestjs/swagger';

@Controller('city')
export class CityController {
    constructor(private readonly cityService: CityService) {}

    @Get('/getAllCitiesByStateId/:id_state')
    @ApiOperation({summary: 'Retorna todas as cidades do estado selecionado.'})
    async getAllCitiesByStateId(@Param('id_state') id_state : number) {
        return this.cityService.getAllCitiesByStateId(id_state);
    }

    @Get('/:id_city')
    @ApiOperation({summary: 'Retorna a cidade selecionada.'})
    async getCityById(@Param('id_city') id_city : number) {
        return this.cityService.getCityById(id_city);
    }
}
