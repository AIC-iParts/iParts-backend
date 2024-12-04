import { Injectable, NotFoundException, HttpException, HttpStatus, ConflictException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateShopDto } from './dto/create_shop.dto';
import { UpdateShopDto } from './dto/update_shop.dto';
import { GeocodingService } from 'src/geocoding/geocoding.service';

import * as bcrypt from 'bcrypt';

@Injectable()
export class ShopService {
  constructor(private prisma: PrismaService,
    private readonly geocodingService: GeocodingService
  ) {}

  // Método para criar uma nova loja
  async create(createShopDto: CreateShopDto) {
    try {
      // Verifica se já existe uma loja com o mesmo CNPJ
      const existingShopCNPJ = await this.prisma.shop.findUnique({
        where: {
          cnpj: createShopDto.cnpj,
        },
      });

      // Verifica se já existe uma loja com o mesmo E-mail
      const existingShopEmail = await this.prisma.shop.findUnique({
        where: {
          email: createShopDto.email,
        },
      });

      // Se a loja já existir, lança uma exceção de conflito
      if (existingShopCNPJ) {
        throw new ConflictException('CNPJ já registrado.');
      }
      if (existingShopEmail) {
        throw new ConflictException('E-mail já registrado.');
      }

      //gerando hash da senha
      const saltOrRounds = 10;
      const hashedPassword = await bcrypt.hash(createShopDto.password, saltOrRounds);
      createShopDto.password = hashedPassword

      //obtendo lat e long
      const coordinates = await this.geocodingService.getCoordinates(
        `${createShopDto.cep}`
      );

      if (coordinates) {
        createShopDto.lat = coordinates.lat
        createShopDto.long = coordinates.long
      }

      await this.prisma.shop.create({
        data: createShopDto,
      });

      return {
        message: "Loja cadastrada com sucesso!"
      }

    } catch (error) {
      //console.log(error)
      throw new HttpException(
        error.message,
        error.status,
      );
    }
  }

  // Método para listar todas as lojas
  async findAll() {
    return await this.prisma.shop.findMany();
  }

  // Método para encontrar uma loja específica pelo ID
  async findOne(id_shop: number) {

    const shop = await this.prisma.shop.findUnique({ 
        where:  {
           id_shop : id_shop 
          } 
      });

    if (!shop) {
      throw new NotFoundException(`Shop with ID ${id_shop} not found`);
    }
    return shop;
  }

  // Método para atualizar uma loja específica pelo ID
  async update(id_shop: number, updateShopDto: UpdateShopDto) {
    const shop = await this.prisma.shop.update({
      where: { id_shop },
      data: updateShopDto,
    });
    return shop;
  }

  // Método para remover uma loja específica pelo ID
  async remove(id_shop: number) {
    await this.prisma.shop.delete({ where: { id_shop } });
  }
}