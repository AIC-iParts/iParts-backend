import { Expose, Type } from 'class-transformer';
import { ResponseStateDto } from 'src/state/dto/response_state.dto';

export class ResponseCityDto {
  @Expose()
  id_city: number;

  @Expose()
  name: string;

  @Expose()
  id_state: number;

  @Expose()
  @Type(() => ResponseStateDto)
  state: ResponseStateDto;
}
