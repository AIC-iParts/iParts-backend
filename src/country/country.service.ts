import { Injectable, NotFoundException } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { PrismaService } from 'src/prisma/prisma.service';
import { ResponseCountryDto } from './dto/response_country.dto';

@Injectable()
export class CountryService {
    constructor(
        private prisma: PrismaService,
    ) {}        

    async getAllCountries() {
        const countries = await this.prisma.country.findMany();
        return plainToInstance(ResponseCountryDto, countries, {excludeExtraneousValues: true});
    }

    async getCountryById(id_country: number) {
        const country = await this.prisma.country.findUnique({ 
                    where:  {
                       id : id_country
                      } 
                  });
            
                if (!country) {
                  throw new NotFoundException(`Country with ID ${id_country} not found`);
                }
                return plainToInstance(ResponseCountryDto, country, {excludeExtraneousValues: true});
    }

    async getCountryByCountryCode(country_code: string) {
      const country = await this.prisma.country.findFirst({ 
        where:  {
           country_code : country_code
          }
      });

      if (!country) {
        throw new NotFoundException(`Country with code ${country_code} not found`);
      }
      return plainToInstance(ResponseCountryDto, country, {excludeExtraneousValues: true});
    }
    
}
