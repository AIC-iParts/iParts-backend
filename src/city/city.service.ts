import { Injectable, NotFoundException} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CacheService } from 'src/cache/cache.service';
import { StateService } from 'src/state/state.service';

@Injectable()
export class CityService {
    constructor(
        private prisma: PrismaService,
        private readonly cacheService : CacheService,
        private readonly stateService : StateService,
    ) {}

    async getAllCities() { //Retorna todas as cidades
        return await this.prisma.city.findMany();
    }

    async getCityById(id_city : number) { //Retorna a cidade do id especificado
        const city = await this.prisma.city.findUnique({ 
            where:  {
               id_city : id_city 
              } 
          });
    
        if (!city) {
          throw new NotFoundException(`City with ID ${id_city} not found`);
        }
        return city;
    }

    async getCityByName(city_name : string) { //Retorna a cidade do nome informado
        const city = await this.prisma.city.findFirst({ 
            where:  {
               name : city_name
              } 
          });
    
        if (!city) {
          throw new NotFoundException(`City with name ${city_name} not found`);
        }
        return city;
    }

    async getAllCitiesByStateId(id_state : number) { //Retorna todas as cidades que são do state com id fornecido
        await this.stateService.getStateById(id_state)

        return this.cacheService.getCache(`state_${id_state}`,
            () => this.prisma.city.findMany({
                    where: {
                         id_state : id_state
                     }
                })
            );
    }

}
