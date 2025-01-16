import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateAddressDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    name: string;
    
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    cep: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    street: string;
  
    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    address_number: number;
  
    @ApiProperty()
    @IsOptional()
    @IsString()
    complement: string

    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    id_city: number;
}
