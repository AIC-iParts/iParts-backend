import { Expose } from 'class-transformer';

export class ResponseCityDto {
  @Expose()
  id_city: number;

  @Expose()
  name: string;

  @Expose()
  id_state: number;
}
