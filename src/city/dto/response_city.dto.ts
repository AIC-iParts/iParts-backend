import { Expose, Type } from 'class-transformer';
import { ResponseStateDto } from 'src/state/dto/response_state.dto';

export class ResponseCityDto {
  @Expose()
  id: number;

  @Expose()
  name: string;

  @Expose()
  id_state: number;

  @Expose()
  @Type(() => ResponseStateDto)
  state: ResponseStateDto;
}
