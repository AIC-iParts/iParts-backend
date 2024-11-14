import { IsDate, IsEmail, IsNotEmpty, IsNumber, IsOptional, IsString, MinLength } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateShopDto {
  @IsNotEmpty({ message: 'O nome da loja é obrigatório.' })
  name: string;

  @IsNotEmpty({ message: 'O CNPJ é obrigatório.' })
  @IsString()
  cnpj: string;
  
  @IsNotEmpty({ message: 'A senha é obrigatória.' })
  @IsString()
  @MinLength(6, { message: 'A senha deve ter pelo menos 6 caracteres.' })
  password: string;

  @IsNotEmpty({ message: 'O e-mail é obrigatório.' })
  @IsString()
  @IsEmail({}, { message: 'O e-mail deve ser válido.' })
  email: string;

  @IsNotEmpty({ message: 'O número de telefone é obrigatório.' })
  @IsString()
  phone: string;

  @IsOptional()
  @IsDate({ message: 'Data de fundação deve ser uma data válida.' })
  @Type(() => Date)
  fundation_date: Date;

  @IsNotEmpty({ message: 'A rua é obrigatória.' })
  @IsString()
  street: string;

  @IsNotEmpty({ message: 'O número é obrigatório.' })
  @IsNumber()
  number: number;

  @IsNotEmpty({ message: 'A cidade é obrigatória.' })
  @IsString()
  city: string;

  @IsNotEmpty({ message: 'O estado é obrigatório.' })
  @IsString()
  state: string;

  @IsNotEmpty({ message: 'O país é obrigatório.' })
  @IsString()
  country: string;

  @IsNotEmpty({ message: 'O CEP é obrigatório.' })
  @IsString()
  cep: string;

  @IsOptional()
  @IsString()
  complement: string

  @IsOptional()
  @IsNumber()
  lat: number;

  @IsOptional()
  @IsNumber()
  long: number;
}
