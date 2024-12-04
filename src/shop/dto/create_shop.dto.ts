import { IsDate, IsEmail, IsNotEmpty, IsNumber, IsOptional, IsString, MinLength } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateShopDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @IsString()
  cnpj: string;
  
  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  password: string;

  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  phone: string;

  @IsOptional()
  @IsDate()
  @Type(() => Date)
  fundation_date: Date;

  @IsNotEmpty()
  @IsString()
  cep : string;

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

  @IsOptional()
  @IsNumber()
  lat: number;

  @IsOptional()
  @IsNumber()
  long: number;
}
