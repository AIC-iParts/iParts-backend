import { Injectable, NotFoundException} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CacheService } from 'src/cache/cache.service';

@Injectable()
export class CityService {
    constructor(
        private prisma: PrismaService,
        private readonly cacheService : CacheService,
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
        return this.cacheService.getCache(`state_${id_state}`,
            () => this.prisma.city.findMany({
                    where: {
                         id_state : id_state
                     }
                })
            );
    }

}
