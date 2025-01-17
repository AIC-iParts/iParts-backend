import { Expose, Type } from 'class-transformer';
import { ResponseShopDto } from 'src/shop/dto/response_shop.dto';

export class ResponseProductDto {
  @Expose()
  id_shop: number;

  @Expose()
  @Type(() => ResponseShopDto)
  shop: ResponseShopDto;
  
  @Expose()
  name: string;

  @Expose()
  description: string;
  
  @Expose()
  price: number;

  @Expose()
  category: string;

  @Expose()
  manufacturer: string;

  @Expose()
  serial_number: string;

  @Expose()
  stock: number;

  @Expose()
  lenght : number;

  @Expose()
  width: number;

  @Expose()
  height: number;

  @Expose()
  weight: number;
}
