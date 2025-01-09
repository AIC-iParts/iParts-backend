import { Injectable, NotFoundException } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { GeocodingService } from 'src/geocoding/geocoding.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { ResponseClientDto } from './dto/response_client.dto';

@Injectable()
export class ClientService {
  constructor(private prisma: PrismaService,
      private readonly geocodingService: GeocodingService
    ) {}
  
  async getClientById(id_client: number) {
    const client = await this.prisma.client.findUnique({
      where: {
        id_client: id_client,
      },
    });

    if(!client) {
      throw new NotFoundException(`Client with ID ${id_client} not found`);
    }

    return plainToInstance(ResponseClientDto, client, { excludeExtraneousValues: true });
  }
}
