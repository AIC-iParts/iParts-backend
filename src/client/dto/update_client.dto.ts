import { PartialType } from '@nestjs/swagger';
import { CreateClientDto } from './create_client.dto';

export class UpdateClientDto extends PartialType(CreateClientDto) {}
