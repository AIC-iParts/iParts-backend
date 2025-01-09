import { Injectable } from '@nestjs/common';
import { GeocodingService } from 'src/geocoding/geocoding.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ClientService {
    constructor(private prisma: PrismaService,
        private readonly geocodingService: GeocodingService
      ) {}

}
