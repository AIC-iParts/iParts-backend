import { Body, Controller, Post, Req } from '@nestjs/common';
import { OrderService } from './order.service';
import { Roles } from 'src/auth/roles.decorator';
import { UserType } from 'src/auth/user_type.enum';
import { ApiBearerAuth, ApiOperation, ApiProperty } from '@nestjs/swagger';
import { CreateOrderDto } from './dto/create_order.dto';

@ApiBearerAuth()
@Controller('order')
export class OrderController {
    constructor( private readonly orderService: OrderService) {}

    @Post()
    @Roles(UserType.Client)
    @ApiProperty()
    @ApiOperation({summary: 'Realiza um novo pedido.'})
    async createOrderController(@Req() request: Request, @Body() creteOrderDto: CreateOrderDto) {
        return this.orderService.createOrder(request=request, creteOrderDto=creteOrderDto)
    }
}
