import { Body, Controller, Get, Param, Post, Req } from '@nestjs/common';
import { ProductService } from './product.service';
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { Roles } from 'src/auth/roles.decorator';
import { UserType } from 'src/auth/user_type.enum';
import { CreateProductDto } from './dto/create_product.dto';

@ApiBearerAuth()
@Controller('product')
export class ProductController {

    constructor(private readonly productService: ProductService) {}

    @Post()
    @Roles(UserType.Shop)
    @ApiOperation({summary: 'Cadastra um novo produto à loja.'})
    async createProductController(@Req() request: Request, @Body() createProductDto: CreateProductDto) {
        return await this.productService.createProduct(createProductDto, request);
    }

    @Get()
    @ApiOperation({summary: 'Retorna todos os produtos.'})
    async getallProductsController() {
        return await this.productService.getAllProducts();
    }

    @Get(':id_product')
    @ApiOperation({summary: 'Retorna o produto selecionado.'})
    async getProductByIdController(@Param('id_product') id_product: number) {
        return await this.productService.getProductById(id_product);
    }

    @Get(':id_shop/:category')
    @ApiOperation({summary: 'Retorna todos os produtos da loja e categoria selecionadas.'})
    async getAllProductsForShopAndCategoryController(@Param('id_product') id_shop: number, @Param('category') category:string) {
        return await this.productService.getAllProductsForShopAndCategory(id_shop=id_shop, category=category);
    }

    @Get(':id_shop')
    @ApiOperation({summary: 'Retorna todos os produtos da loja selecionado.'})
    async getAllProductsForShopController(@Param('id_product') id_shop: number) {
        return await this.productService.getAllProductsForShop(id_shop);
    }
}
