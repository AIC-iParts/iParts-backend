import { Expose } from 'class-transformer';

export class ResponseCountryDto {
  @Expose()
  id: number;

  @Expose()
  name: string;

  @Expose()
  country_code: string;
}
