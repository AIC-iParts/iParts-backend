import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Min,
  ValidateNested,
} from "class-validator";

export class CreateOrderProductDto {
    @ApiProperty({
      description: "ID do produto",
      type: Number,
    })
    @IsNotEmpty()
    @IsNumber()
    id_product: number;
  
    @ApiProperty({
      description: "Quantidade do produto",
      type: Number,
      minimum: 1, // Adiciona validação visual no Swagger
    })
    @IsNotEmpty()
    @IsNumber()
    @Min(1) // Usa `Min` para números
    amount: number;
  }
  

export class CreateOrderDto {
  @ApiProperty({
    description: "Observações adicionais para o pedido",
    required: false,
    type: String,
  })
  @IsOptional()
  @IsString()
  observations?: string;

  @ApiProperty({
    description: "ID da loja onde o pedido será realizado",
    type: Number,
  })
  @IsNotEmpty()
  @IsNumber()
  id_shop: number;

  @ApiProperty({
    description: "Lista de produtos incluídos no pedido",
    type: [CreateOrderProductDto], // Define explicitamente que é um array de objetos
  })
  @IsNotEmpty()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateOrderProductDto) // Necessário para objetos aninhados
  order_products: CreateOrderProductDto[];
}
