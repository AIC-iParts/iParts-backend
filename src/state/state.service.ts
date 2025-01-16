import { Injectable, NotFoundException } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { PrismaService } from 'src/prisma/prisma.service';
import { ResponseStateDto } from './dto/response_state.dto';

@Injectable()
export class StateService {
    constructor(
        private prisma: PrismaService,
    ) {}

    async getStateById(id_state: number) {
        const state = await this.prisma.state.findUnique({ 
                    where:  {
                       id : id_state
                      },
                      include: { country: true }
                  });
            
                if (!state) {
                  throw new NotFoundException(`State with ID ${id_state} not found`);
                }
                return plainToInstance(ResponseStateDto, state, {excludeExtraneousValues: true});
    }

    async getStateByStateCode(state_code: string) {
      const state = await this.prisma.state.findFirst({ 
        where:  {
           state_code : state_code
          },
          include: { country: true }
      });

      if (!state) {
        throw new NotFoundException(`State with code ${state_code} not found`);
      }
      return plainToInstance(ResponseStateDto, state, {excludeExtraneousValues: true});
    }
    
}
