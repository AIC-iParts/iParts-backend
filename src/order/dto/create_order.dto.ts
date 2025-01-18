import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsArray, IsNotEmpty, IsNumber, IsOptional, IsString, MinLength, ValidateNested } from "class-validator";

export class CreateOrderDto { 
    @ApiProperty()
    @IsOptional()
    @IsString()
    observations?: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    id_shop: number;

    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => CreateOrderProductDto)
    order_products: CreateOrderProductDto[];
}

class CreateOrderProductDto {
    @IsNumber()
    id_product: number;
  
    @IsNumber()
    @MinLength(1)
    amount: number;
  }
