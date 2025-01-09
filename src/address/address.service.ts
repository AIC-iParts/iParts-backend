import { Injectable, NotFoundException, HttpException, HttpStatus, ConflictException } from '@nestjs/common';
import { GeocodingService } from 'src/geocoding/geocoding.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateAddressDto } from './dto/create_address.dto';
import { Prisma } from '@prisma/client';
import { plainToInstance } from 'class-transformer';
import { ResponseAddressDto } from './dto/response_address.dto';

@Injectable()
export class AddressService {
  constructor(private prisma: PrismaService,
      private readonly geocodingService: GeocodingService
    ) {}

  async getAllAddresses() {
      return await this.prisma.address.findMany();
  }

  async getAddressById(id_address : number) {
      const address = await this.prisma.address.findUnique({ 
          where:  {
              id_address : id_address 
            } 
        });
  
      if (!address) {
        throw new NotFoundException(`Address with ID ${id_address} not found`);
      }
      return address;
  }

  async createAddress(createAddressDto : CreateAddressDto){
    try {
      const newAddress = await this.prisma.address.create({
        data: {
          ...createAddressDto,
        } as Prisma.AddressUncheckedCreateInput,
      });
  
      return {
        message: "Endereço cadastrado com sucesso!",
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
