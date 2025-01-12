import { Expose, Type } from 'class-transformer';
import { ResponseCityDto } from 'src/city/dto/response_city.dto';

export class ResponseAddressDto {
  @Expose()
  id_address: number;

  @Expose()
  name?: string;

  @Expose()
  cep: string;

  @Expose()
  street: string;

  @Expose()
  address_number: string;

  @Expose()
  complement?: string;

  @Expose()
  id_city: number;

  @Expose()
  @Type(() => ResponseCityDto)
  city: ResponseCityDto;
}
