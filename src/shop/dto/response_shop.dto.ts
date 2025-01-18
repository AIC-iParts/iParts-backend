import { Expose, Type } from "class-transformer";
import { ResponseCityDto } from "src/city/dto/response_city.dto";

export class ResponseShopDto {
    @Expose()
    id: number;

    @Expose()
    name: string;

    @Expose()
    cnpj: string;

    @Expose()
    email: string;

    @Expose()
    phone: string;

    @Expose()
    fundation_date?: Date;

    @Expose()
    cep : string;

    @Expose()
    street: string;

    @Expose()
    address_number: number;

    @Expose()
    complement?: string

    @Expose()
    delivery_value: number;
    
    @Expose()
    opened: boolean;
    
    @Expose()
    id_city: number;

    @Expose()
    @Type(() => ResponseCityDto)
    city: ResponseCityDto;
}
