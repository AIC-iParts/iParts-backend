import { Controller, Get, Param } from '@nestjs/common';
import { CityService } from './city.service';

@Controller('city')
export class CityController {
    constructor(private readonly cityService: CityService) {}

    @Get('/:id_state')
    async getAllCitiesByStateId(@Param('id_state') id_state : number) {
        return this.cityService.getAllCitiesByStateId(id_state);
    }
}
