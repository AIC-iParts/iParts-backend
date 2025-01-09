import { Expose } from 'class-transformer';

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
}
