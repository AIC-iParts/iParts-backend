import { Inject, Injectable, NotFoundException} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CACHE_MANAGER, Cache } from '@nestjs/cache-manager';

@Injectable()
export class CityService {
    constructor(
        private prisma: PrismaService,
        @Inject(CACHE_MANAGER) private cacheManager: Cache,
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

    async getAllCitiesByStateId(id_state : number) { //Retorna todas as cidades que são do state com id fornecido
        const citiesCache = await this.cacheManager.get(`${id_state}`);
        //console.log(citiesCache)
        if (citiesCache) {
            return citiesCache
        }

        const state = await this.prisma.state.findUnique({ 
            where:  {
               id_state : id_state
              } 
          });
    
        if (!state) {
          throw new NotFoundException(`State with ID ${id_state} not found`);
        }
        
        const cities = await this.prisma.city.findMany({
            where: {
                id_state : id_state
            }
        });
        await this.cacheManager.set(`${id_state}`, cities);
        
        return cities
    }

}
