import { Injectable, NotFoundException, HttpException, ConflictException} from '@nestjs/common';
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
  async createShopService(createShopDto: CreateShopDto) {
    try {
      const {name, cnpj, password, confirmPassword, email, phone, fundation_date, cep, street, address_number, complement, id_city} = createShopDto
      // Verifica se já existe uma loja com o mesmo CNPJ ou E-mail
      const existingShop = await this.prisma.shop.findFirst({
        where: {
          OR: [
            { cnpj: cnpj },
            { email: email },
          ],
        },
      });

      // Se a loja já existir, lança uma exceção de conflito
      if (existingShop) {
        if (existingShop.cnpj === cnpj) {
          throw new ConflictException('CNPJ já registrado.');
        }
        if (existingShop.email === email) {
          throw new ConflictException('E-mail já registrado.');
        }
      }

      if (password != confirmPassword) {
        throw new ConflictException('As senhas não coincidem')
      }

      //gerando hash da senha
      const saltOrRounds = 10;
      const hashedPassword = await bcrypt.hash(password, saltOrRounds);

      //obtendo lat e long
      const coordinates = await this.geocodingService.getCoordinates(
        `${cep}`
      );

      const newShop = await this.prisma.shop.create({
        data: {
          name,
          cnpj,
          password: hashedPassword,
          email,
          phone,
          fundation_date,
          cep,
          street,
          address_number,
          complement,
          id_city,
          lat: coordinates?.lat,
          long:coordinates?.long
        },
      });

      return {
        message: "Loja cadastrada com sucesso!",
        shop: {
          id_shop: newShop.id_shop,
          name: newShop.name,
          cnpj: newShop.cnpj,
          email: newShop.email,
        },
      };

    } catch (error) {
      //console.log(error)
      throw new HttpException(
        error.message,
        error.status,
      );
    }
  }

  // Método para listar todas as lojas
  async getAllShopsService() {
    return await this.prisma.shop.findMany();
  }

  // Método para encontrar uma loja específica pelo ID
  async getShopByIdService(id_shop: number) {

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
  async updateShopService(id_shop: number, updateShopDto: UpdateShopDto) {
    const shop = await this.prisma.shop.update({
      where: { id_shop },
      data: updateShopDto,
    });
    return shop;
  }

  // Método para remover uma loja específica pelo ID
  async deleteShopService(id_shop: number) {
    await this.prisma.shop.delete({ where: { id_shop } });
  }
}