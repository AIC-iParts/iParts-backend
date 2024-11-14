import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class GeocodingService {
  async getCoordinates(address: string): Promise<{ lat: number, long: number }> {
    const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}`;
    
    try {
      const response = await axios.get(url, {
        headers: {
          'User-Agent': 'iParts',
        },
      });
      
      const data = response.data;
      
      if (data.length > 0) {
        const location = data[0];  // Pega a primeira correspondência
        return { lat: parseFloat(location.lat), long: parseFloat(location.lon) };
      } else {
        throw new Error('Endereço não encontrado');
      }
    } catch (error) {
      throw new Error(`Erro ao obter geolocalização: ${error.message}`);
    }
  }
}
