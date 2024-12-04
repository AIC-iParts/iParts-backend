import { PartialType } from '@nestjs/swagger';
import { CreateAddressDto } from './create_address.dto';

export class UpdateAddressDto extends PartialType(CreateAddressDto) {}
