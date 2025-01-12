import { Controller, Get, Param } from '@nestjs/common';
import { CityService } from './city.service';

@Controller('city')
export class CityController {
    constructor(private readonly cityService: CityService) {}

    @Get('/getAllCitiesByStateId/:id_state')
    async getAllCitiesByStateId(@Param('id_state') id_state : number) {
        return this.cityService.getAllCitiesByStateId(id_state);
    }

    @Get('/:id_city')
    async getCityById(@Param('id_city') id_city : number) {
        return this.cityService.getCityById(id_city);
    }
}
