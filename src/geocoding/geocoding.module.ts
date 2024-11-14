import { Module } from '@nestjs/common';
import { GeocodingService } from './geocoding.service';

@Module({
  controllers: [],
  providers: [GeocodingService], // Registra o serviço aqui
  exports: [GeocodingService], // Exporta para que outros módulos possam usá-lo
})
export class GeocodingModule {}
