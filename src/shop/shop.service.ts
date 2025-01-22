import {
  Injectable,
  NotFoundException,
  HttpException,
  ConflictException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateShopDto } from './dto/create_shop.dto';
import { UpdateShopDto } from './dto/update_shop.dto';
import { GeocodingService } from 'src/geocoding/geocoding.service';
import { plainToInstance } from 'class-transformer';

import * as bcrypt from 'bcrypt';
import { ResponseShopDto } from './dto/response_shop.dto';
import { CityService } from 'src/city/city.service';
import { StateService } from 'src/state/state.service';

@Injectable()
export class ShopService {
  constructor(
    private prisma: PrismaService,
    private readonly geocodingService: GeocodingService,
    private readonly cityService: CityService,
    private readonly stateService: StateService,
  ) {}

  // Método para criar uma nova loja
  async createShopService(createShopDto: CreateShopDto) {
    try {
      const { confirmPassword, city_name, state_code, ...rest } = createShopDto;
      // Verifica se já existe uma loja com o mesmo CNPJ ou E-mail
      const existingShop = await this.prisma.shop.findFirst({
        where: {
          OR: [{ cnpj: createShopDto.cnpj }, { email: createShopDto.email }],
        },
      });

      // Se a loja já existir, lança uma exceção de conflito
      if (existingShop) {
        if (existingShop.cnpj === createShopDto.cnpj) {
          throw new ConflictException('CNPJ já registrado.');
        }
        if (existingShop.email === createShopDto.email) {
          throw new ConflictException('E-mail já registrado.');
        }
      }

      if (createShopDto.password != confirmPassword) {
        throw new ConflictException('As senhas não coincidem.');
      }

      const city = await this.cityService.getCityByName(
        createShopDto.city_name,
      ); // verifica se o id de cidade informado é valido
      const state = await this.stateService.getStateByStateCode(
        createShopDto.state_code,
      );

      if (city.state.state_code != state.state_code) {
        throw new ConflictException(
          'A cidade não pertence ao estado informado.',
        );
      }

      //gerando hash da senha
      const saltOrRounds = 10;
      const hashedPassword = await bcrypt.hash(
        createShopDto.password,
        saltOrRounds,
      );

      //obtendo lat e long
      const coordinates = await this.geocodingService.getCoordinates(
        `${createShopDto.city_name} - ${createShopDto.state_code}`,
      );

      const newShop = await this.prisma.shop.create({
        data: {
          ...rest,
          id_city: city.id,
          password: hashedPassword,
          lat: coordinates?.lat ? coordinates?.lat : 0,
          long: coordinates?.long ? coordinates?.long : 0,
        },
      });

      return {
        message: 'Loja cadastrada com sucesso!',
        statusCode: 201,
        shop: plainToInstance(ResponseShopDto, newShop, {
          excludeExtraneousValues: true,
        }),
      };
    } catch (error) {
      //console.log(error)
      throw new HttpException(
        `${error.message} Erro desconhecido.`,
        error.status,
      );
    }
  }

  // Método para listar todas as lojas
  async getAllShopsService() {
    const shops = await this.prisma.shop.findMany();
    return plainToInstance(ResponseShopDto, shops, {
      excludeExtraneousValues: true,
    });
  }

  async getLoginShopInfos(cnpj: string) {
    const shop = await this.prisma.shop.findUnique({
      where: { cnpj: cnpj },
      include: {
        city: {
          include: {
            state: {
              include: {
                country: true,
              },
            },
          },
        },
      },
    });

    return shop;
  }

  async getShopByCnpjService(cnpj: string) {
    const shop = await this.prisma.shop.findUnique({
      where: { cnpj: cnpj },
    });

    if (!shop) {
      throw new NotFoundException(`Shop with CNPJ ${cnpj} not found`);
    }

    return plainToInstance(ResponseShopDto, shop, {
      excludeExtraneousValues: true,
    });
  }
  // Método para encontrar uma loja específica pelo ID
  async getShopByIdService(id_shop: number) {
    const shop = await this.prisma.shop.findUnique({
      where: {
        id: id_shop,
      },
      include: {
        city: {
          include: {
            state: {
              include: {
                country: true,
              },
            },
          },
        },
      },
    });

    if (!shop) {
      throw new NotFoundException(`Shop with ID ${id_shop} not found`);
    }
    return plainToInstance(ResponseShopDto, shop, {
      excludeExtraneousValues: true,
    });
  }

  async getAllShopsByCityIdService(id_city: number) {
    await this.cityService.getCityById(id_city);

    const shops = await this.prisma.shop.findMany({
      where: { id_city: id_city },
    });

    if (!shops) {
      throw new NotFoundException(`Shops not found`);
    }

    return plainToInstance(ResponseShopDto, shops, {
      excludeExtraneousValues: true,
    });
  }

  async getAllShopsOpenedByCityIdService(id_city: number) {
    await this.cityService.getCityById(id_city);

    const shops = await this.prisma.shop.findMany({
      where: {
        id_city: id_city,
        opened: true,
      },
    });

    if (!shops) {
      throw new NotFoundException(`Shops not found`);
    }

    return plainToInstance(ResponseShopDto, shops, {
      excludeExtraneousValues: true,
    });
  }

  // Método para atualizar uma loja específica pelo ID
  async updateShopService(updateShopDto: UpdateShopDto, request: Request) {
    const shop = request['user'];

    const updatedShop = await this.prisma.shop.update({
      where: { id: shop.id },
      data: updateShopDto,
    });

    return plainToInstance(ResponseShopDto, updatedShop, {
      excludeExtraneousValues: true,
    });
  }

  async setShopOpnenedStatus(request: Request, opened: boolean) {
    const shop = request['user'];

    await this.getShopByIdService(shop.id);
    try {
      const success = await this.prisma.shop.update({
        where: { id: shop.id },
        data: { opened: opened },
      });

      return {
        message: 'Alterado com sucesso.',
        statusCode: 201,
      };
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  // Método para remover uma loja específica pelo ID
  async deleteShopService(request: Request) {
    const shop = request['user'];
    await this.prisma.shop.delete({ where: { id: shop.id } });
  }
}
