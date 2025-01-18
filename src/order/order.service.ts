import { BadRequestException, HttpException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { ShopService } from 'src/shop/shop.service';
import { CreateOrderDto } from './dto/create_order.dto';
import { ProductService } from 'src/product/product.service';

@Injectable()
export class OrderService {
    constructor(
        private prisma: PrismaService,
        private readonly shopService: ShopService,
        private readonly productService: ProductService
    ) {}

    async createOrder(request: Request, createOrderDto: CreateOrderDto) {
        const client = request['user']

        const { observations, id_shop, order_products } = createOrderDto

        const shop = await this.shopService.getShopByIdService(createOrderDto.id_shop)

        if (!shop.opened) {
            throw new BadRequestException('A loja está fechada no momento.');
        }

        const products_ids = order_products.map((product) => product.id_product)

        const products = await this.productService.getProductsByIds(products_ids)

        const product_map = new Map(products.map((product) => [product.id, product.price]))

        const totalValue = order_products.reduce((total, product) => {
            const price = product_map.get(product.id_product);
            if (!price) throw new BadRequestException('Produto inválido.');
            return total + price * product.amount;
        }, 0);

        try {
            const createdOrder = await this.prisma.order.create({
                data: {
                    observations,
                    delivery_value: shop.delivery_value,
                    shop: { connect: { id: id_shop } },
                    client: { connect: { id: client.id } },
                    total_value: totalValue,
                    order_products: {
                        create: order_products.map((product) => ({
                            product: { connect: { id: product.id_product } },
                            price: product_map.get(product.id_product),
                            amount: product.amount
                        })),
                    },
                },
                include: {order_products: true}
            })

            return {
            message: "Pedido efetuado com sucesso!",
            statusCode: 201,
            address: createdOrder
            };

        } catch(error) {
            throw new HttpException(
                error.message,
                error.status,
                );
        }
    }

    async getAllOrdersForShop(request: Request) {
        const shop = request['user']

        try{
            const orders = await this.prisma.order.findMany({
                where: { 
                    id_shop: shop.id,
                }
            });

            return orders

        } catch(error) {
            throw new HttpException(
                error.message,
                error.status,
                );
        }
    }

    async getAllOrdersPendingForShop(request: Request) {
        const shop = request['user']

        try{
            const orders = await this.prisma.order.findMany({
                where: { 
                    id_shop: shop.id,
                    status: 'Pending',
                }
            });

            return orders

        } catch(error) {
            throw new HttpException(
                error.message,
                error.status,
                );
        }
    }

    async setOrderStatusToFinished(request: Request, id_order: number) {
        const shop = request['user']

        try{
            const success = await this.prisma.order.update({
                where: {
                    id: id_order,
                    id_shop: shop.id
                },
                data: {
                    status: 'Finished'
                }
            })

            return {
                message: "Alterado com sucesso.",
                statusCode: 201,
            }

        } catch(error) {
            throw new HttpException(
                error.message,
                error.status,
                );
        }
    }

}
