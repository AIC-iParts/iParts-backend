import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateAddressDto {
    @IsNotEmpty()
    @IsString()
    name: string;
    
    @IsNotEmpty()
    @IsString()
    cep: string;

    @IsNotEmpty()
    @IsString()
    street: string;
  
    @IsNotEmpty()
    @IsNumber()
    address_number: number;
  
    @IsOptional()
    @IsString()
    complement: string

    @IsNotEmpty()
    @IsNumber()
    id_city: number;

    @IsNotEmpty()
    @IsNumber()
    id_client: number;
  
    @IsNotEmpty()
    @IsNumber()
    lat: number;
  
    @IsNotEmpty()
    @IsNumber()
    long: number;
}
