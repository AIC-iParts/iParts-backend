import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateShopDto } from './dto/create_shop.dto';
import { UpdateShopDto } from './dto/update_shop.dto';

@Injectable()
export class ShopService {
  constructor(private prisma: PrismaService) {}

  // Método para criar uma nova loja
  async create(createShopDto: CreateShopDto) {
    return await this.prisma.shop.create({
      data: createShopDto,
    });
  }

  // Método para listar todas as lojas
  async findAll() {
    return await this.prisma.shop.findMany();
  }

  // Método para encontrar uma loja específica pelo ID
  async findOne(id_shop: number) {
    const shop = await this.prisma.shop.findUnique({ where: { id_shop } });
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