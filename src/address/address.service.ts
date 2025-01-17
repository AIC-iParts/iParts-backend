import { Injectable, NotFoundException, HttpException } from '@nestjs/common';
import { GeocodingService } from 'src/geocoding/geocoding.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateAddressDto } from './dto/create_address.dto';
import { plainToInstance } from 'class-transformer';
import { ResponseAddressDto } from './dto/response_address.dto';
import { ClientService } from 'src/client/client.service';
import { CityService } from 'src/city/city.service';

@Injectable()
export class AddressService {
  constructor(
      private prisma: PrismaService,
      private readonly geocodingService: GeocodingService,
      private readonly clientService: ClientService,
      private readonly cityService: CityService,
    ) {}

  async getAddressById(id_address : number) {
      const address = await this.prisma.address.findUnique({ 
          where:  {
              id : id_address 
            },
            include: { 
              city: {
                include: {
                  state: {
                    include: {
                      country: true
                    }
                  }
                }
              }
            }
        });
  
      if (!address) {
        throw new NotFoundException(`Address with ID ${id_address} not found`);
      }
      return plainToInstance(ResponseAddressDto, address, {excludeExtraneousValues: true});
  }

  async createAddress(createAddressDto: CreateAddressDto, request: Request){
    const client = request['user']
    try {
      await this.clientService.getClientById(client.id); // verifica se o client existe
      await this.cityService.getCityById(createAddressDto.id_city); // verifica se a cidade informada é válida

      //obtendo lat e long
      const coordinates = await this.geocodingService.getCoordinates(
        `${createAddressDto.cep}`
      );

      const newAddress = await this.prisma.address.create({
        data: {
          ...createAddressDto,
          id_client: client.id,
          lat: coordinates.lat,
          long: coordinates.long
        },
      });
  
      return {
        message: "Endereço cadastrado com sucesso!",
        statusCode: 201,
        address: plainToInstance(ResponseAddressDto, newAddress, {excludeExtraneousValues: true}),
      };

    } catch (error) {
      //console.log(error)
      throw new HttpException(
        error.message,
        error.status,
      );
    }
  }
}
