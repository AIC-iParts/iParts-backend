import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginClientDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  cpf: string;
  
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  password: string;
}
