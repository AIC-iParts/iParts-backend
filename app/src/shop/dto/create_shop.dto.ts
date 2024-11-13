import { IsDate, IsEmail, IsNotEmpty, IsOptional, MinLength } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateShopDto {
  @IsNotEmpty({ message: 'O nome da loja é obrigatório.' })
  name: string;

  @IsNotEmpty({ message: 'O CNPJ é obrigatório.' })
  cnpj: string;
  
  @IsNotEmpty({ message: 'A senha é obrigatória.' })
  @MinLength(6, { message: 'A senha deve ter pelo menos 6 caracteres.' })
  password: string;

  @IsNotEmpty({ message: 'O e-mail é obrigatório.' })
  @IsEmail({}, { message: 'O e-mail deve ser válido.' })
  email: string;

  @IsNotEmpty({ message: 'O número de telefone é obrigatório.' })
  phone: string;

  @IsNotEmpty({message: 'A data de fundação é obrigatória.'})
  @IsDate({ message: 'Data de fundação deve ser uma data válida.' })
  @Type(() => Date)
  fundation_date: Date;

  @IsNotEmpty({ message: 'A rua é obrigatória.' })
  street: string;

  @IsNotEmpty({ message: 'O número é obrigatório.' })
  number: number;

  @IsNotEmpty({ message: 'A cidade é obrigatória.' })
  city: string;

  @IsNotEmpty({ message: 'O estado é obrigatório.' })
  state: string;

  @IsNotEmpty({ message: 'O país é obrigatório.' })
  country: string;

  @IsNotEmpty({ message: 'O CEP é obrigatório.' })
  cep: string;

  @IsOptional()
  complement: string

  @IsOptional()
  lat: number;

  @IsOptional()
  long: number;
}
