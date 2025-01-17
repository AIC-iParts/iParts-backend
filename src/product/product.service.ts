import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateProductDto } from './dto/create_product.dto';
import { ShopService } from 'src/shop/shop.service';
import { plainToInstance } from 'class-transformer';
import { ResponseProductDto } from './dto/response_product.dto';
import { UpdateProductDto } from './dto/update_product.dto';

@Injectable()
export class ProductService {
    constructor(
        private prisma: PrismaService,
        private readonly shopService: ShopService
    ) {}

    async createProduct(createProductDto: CreateProductDto, request: Request) {
        const shop = request['user']
        try {
            await this.shopService.getShopByIdService(shop.id)
            console.log(shop.id)
            /*
            const newProduct = await this.prisma.product.create({
            data: {
                ...createProductDto,
                id_shop: shop.id,
                },
            });

            return {
                message: "Produto cadastrado com sucesso!",
                statusCode: 201,
                product: plainToInstance(ResponseProductDto, newProduct, { excludeExtraneousValues: true }),
            };

            */
        } catch (error) {
            //console.log(error)
            throw new HttpException(
            error.message,
            error.status,
            );
        }
    }
    
    async getAllProducts() {
        const products = await this.prisma.product.findMany();
        if (!products) {
            throw new NotFoundException(`Products not found`);
        }
        return plainToInstance(ResponseProductDto, products, { excludeExtraneousValues: true });
    }

    async getAllProductsForShopAndCategory(id_shop: number, category: string) {
        try {
            const products = await this.prisma.product.findMany({
                where: {
                    id_shop: id_shop,
                    category: category
                }
            });
    
            if (!products) {
                throw new NotFoundException(`Products for Shop ID ${id_shop} not found`);
            }
    
            return plainToInstance(ResponseProductDto, products, {excludeExtraneousValues: true})
            
        } catch(error) {
            throw new HttpException(
                error.message,
                error.status,
                );
        }
    }

    async getAllProductsForShop(id_shop: number) {
        const products = await this.prisma.product.findMany({
            where: {id_shop: id_shop}
        });

        if (!products) {
            throw new NotFoundException(`Products for Shop ID ${id_shop} not found`);
        }

        return plainToInstance(ResponseProductDto, products, { excludeExtraneousValues: true });
    }

    async getProductById(id_product: number) {
        const product = await this.prisma.product.findUnique({
            where: {id: id_product}
        })

        if (!product) {
            throw new NotFoundException(`Product with ID ${id_product} not found`);
        }

        return plainToInstance(ResponseProductDto, product, {excludeExtraneousValues: true})
    }
}
