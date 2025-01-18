import { Body, Controller, Get, Param, Post, Req } from '@nestjs/common';
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

    @Get('setOrderStatusToFinished/:id_order')
    @Roles(UserType.Shop)
    @ApiProperty()
    @ApiOperation({summary: 'Seta o status do pedido como finalizado.'})
    async setOrderStatusToFinished(@Req() request: Request, @Param('is_order') id_order: number) {
        return this.orderService.setOrderStatusToFinished(request=request, id_order= id_order)
    }
}
