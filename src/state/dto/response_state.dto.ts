import { Expose, Type } from 'class-transformer';
import { ResponseCountryDto } from 'src/country/dto/response_country.dto';

export class ResponseStateDto {
  @Expose()
  id_state: number;

  @Expose()
  name: string;

  @Expose()
  state_code: string;

  @Expose()
  id_country: number;

  @Expose()
  @Type(() => ResponseCountryDto)
  country: ResponseCountryDto;
}
