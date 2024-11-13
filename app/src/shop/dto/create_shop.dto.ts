import { IsDate, IsEmail, IsNotEmpty, IsOptional, MinLength } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateShopDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  cnpj: string;
  
  @IsNotEmpty()
  @MinLength(6)
  password: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  phone: string;

  @IsOptional()
  @IsDate()
  @Type(() => Date)
  fundation_date: Date;

  @IsNotEmpty()
  street: string;

  @IsNotEmpty()
  number: number;

  @IsNotEmpty()
  city: string;

  @IsNotEmpty()
  state: string;

  @IsNotEmpty()
  country: string;

  @IsNotEmpty()
  cep: string;

  @IsOptional()
  complement: string

  @IsOptional()
  lat: number;

  @IsOptional()
  long: number;
}
