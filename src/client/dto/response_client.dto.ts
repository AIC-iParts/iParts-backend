import { Expose, Type } from "class-transformer";
import { ResponseAddressDto } from "../../address/dto/response_address.dto";

export class ResponseClientDto {
    @Expose()
    id_client: number;

    @Expose()
    name: string;

    @Expose()
    username: string;

    @Expose()
    cpf: string;

    @Expose()
    email: string;

    @Expose()
    phone?: string;

    @Expose()
    date_of_birth?: Date;

    @Expose()
    @Type(() => ResponseAddressDto)
    addresses: ResponseAddressDto[];
}
