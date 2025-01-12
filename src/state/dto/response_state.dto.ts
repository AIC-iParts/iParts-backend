import { Expose } from 'class-transformer';

export class ResponseStateDto {
  @Expose()
  id_state: number;

  @Expose()
  name: string;

  @Expose()
  state_code: string;

  @Expose()
  id_country: number;
}
