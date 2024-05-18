import { Body, Controller, Post } from '@nestjs/common';
import { CartService } from 'app/service/cart/cart.service';

@Controller('cart')
export class CartController {
    constructor(
        private readonly cartService: CartService
    ) { }

    @Post('/create')
    async addCart(@Body() cardData): Promise<any> {
        try {
            const data = await this.cartService.addCart(cardData)
            return data
        } catch (error) {
            console.log(error);
        };

    }
}
