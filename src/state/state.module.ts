import { Module } from '@nestjs/common';
import { StateService } from './state.service';
import { StateController } from './state.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  providers: [StateService, PrismaService],
  controllers: [StateController],
  exports: [StateService]
})
export class StateModule {}
