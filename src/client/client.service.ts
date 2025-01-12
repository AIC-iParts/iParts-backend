import { ConflictException, HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { PrismaService } from 'src/prisma/prisma.service';
import { ResponseClientDto } from './dto/response_client.dto';
import { CreateClientDto } from './dto/create_client.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class ClientService {
  constructor(private prisma: PrismaService,
    ) {}
  
  async createClient(createClientDto: CreateClientDto) {
    try {
      const {confirmPassword, ...rest} = createClientDto
      // Verifica se já existe um cliente com o mesmo CPF ou E-mail
      const existingClient = await this.prisma.client.findFirst({
        where: {
          OR: [
            { cpf: createClientDto.cpf },
            { email: createClientDto.email },
          ],
        },
      });

      // Se a loja já existir, lança uma exceção de conflito
      if (existingClient) {
        if (existingClient.cpf === createClientDto.cpf) {
          throw new ConflictException('CPF já registrado.');
        }
        if (existingClient.email === createClientDto.email) {
          throw new ConflictException('E-mail já registrado.');
        }
      }

      if (createClientDto.password != confirmPassword) {
        throw new ConflictException('As senhas não coincidem.')
      }

      //gerando hash da senha
      const saltOrRounds = 10;
      const hashedPassword = await bcrypt.hash(createClientDto.password, saltOrRounds);

      const newClient = await this.prisma.client.create({
        data: {
          ...rest,
          password: hashedPassword,
        },
      });

      return {
        message: "Cliente cadastrado com sucesso!",
        statusCode: 201,
        client: plainToInstance(ResponseClientDto, newClient, { excludeExtraneousValues: true }),
      };

    } catch (error) {
      //console.log(error)
      throw new HttpException(
        error.status,
        error.message
      );
    }    
  }

  async getClientById(id_client: number) {
    const client = await this.prisma.client.findUnique({
      where: {
        id_client: id_client,
      },
      include: { 
        addresses: {
          include: {
            city: {
              include: {
                state: {
                  include: {
                    country: true
                  }
                }
              }
            }
          }
        } 
      }
    });

    if(!client) {
      throw new NotFoundException(`Client with ID ${id_client} not found`);
    }

    return plainToInstance(ResponseClientDto, client, { excludeExtraneousValues: true });
  }
}
