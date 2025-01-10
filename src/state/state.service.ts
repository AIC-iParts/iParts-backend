import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class StateService {
    constructor(
        private prisma: PrismaService,
    ) {}
    
    async getAllStates() {

    }

    async getStateById(id_state: number) {
        const state = await this.prisma.state.findUnique({ 
                    where:  {
                       id_state : id_state
                      } 
                  });
            
                if (!state) {
                  throw new NotFoundException(`State with ID ${id_state} not found`);
                }
                return state;
    }

    async getStateByName() {

    }
    
}
