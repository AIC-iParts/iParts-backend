import { IsDate, IsEmail, IsNotEmpty, IsNumber, IsOptional, IsString, MinLength } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class CreateShopDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  cnpj: string;
  
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  password: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  confirmPassword: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  phone: string;

  @ApiProperty()
  @IsOptional()
  @IsDate()
  @Type(() => Date)
  fundation_date: Date;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  cep : string;

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
  complement: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  id_city: number;
}
