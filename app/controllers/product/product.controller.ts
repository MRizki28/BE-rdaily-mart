import { Body, Controller, Get, Post, Query, Req, UploadedFile, UseInterceptors, UsePipes } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ProductService } from 'app/service/product/product.service';

@Controller('product')
export class ProductController {
    constructor(
        private readonly productService: ProductService
    ) { }

    @Get()
    async getAllData(
        @Query('page') page: number = 1,
        @Query('pageSize') pageSize: number = 10,
    ): Promise<any> {
        try {
            const data = await this.productService.getAllData(page, pageSize);
            return data;
        } catch (error) {
            console.error('Error while fetching products:', error);
            throw error;
        }
    }

    @Post()
    @UseInterceptors(FileInterceptor('product_image'))
    async createData(@UploadedFile() productImage, @Body() productData): Promise<any> {
        try {
            const data = await this.productService.createData(productData, productImage);
            return data;
        } catch (error) {
            console.log(error);
        }
    }

}
