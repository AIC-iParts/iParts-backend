import { PartialType } from '@nestjs/swagger';
import { CreateShopDto } from './create_shop.dto';

export class UpdateShopDto extends PartialType(CreateShopDto) {}
