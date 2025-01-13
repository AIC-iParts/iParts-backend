import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginShopDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  cnpj: string;
  
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  password: string;
}
