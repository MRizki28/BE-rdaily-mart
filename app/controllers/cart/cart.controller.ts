import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { CartService } from 'app/service/cart/cart.service';

@Controller('cart')
export class CartController {
    constructor(
        private readonly cartService: CartService
    ) { }

    @Get('/')
    async getAllData(): Promise<any> {
        try {
            const data = await this.cartService.getAllData()
            return data
        } catch (error) {
            console.log(error);
        };
    }

    @Post('/create/:id')
    async addCart(@Param('id') id: string): Promise<any> {
        try {
            const data = await this.cartService.addCart(id)
            return data
        } catch (error) {
            console.log(error);
        };
    }

    @Delete('/delete/:id')
    async deleteData(@Param('id') id: string): Promise<any> {
        try {
            const data = await this.cartService.deleteData(id)
            return data
        } catch (error) {
            console.log(error);
        };
    }
}
