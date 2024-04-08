import { Body, Controller, Delete, Get, Param, Post, Query, Req, Res, UploadedFile, UseInterceptors, UsePipes } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ProductService } from 'app/service/product/product.service';
import { Response } from 'express';

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

    @Post('update/:id')
    @UseInterceptors(FileInterceptor('product_image'))
    async updateData(@Param('id') id: string, @UploadedFile() productImage, @Body() productData): Promise<any> {
        try {
            const data = await this.productService.updateData(productData, productImage, id);
            return data;
        } catch (error) {
            console.log(error);
        }
    }

    @Get('get/:id')
    async getDataById(@Param('id') id: string): Promise<any> {
        try {
            const data = await this.productService.getDataById(id)
            return data
        } catch (error) {
            console.log(error);
        };
    }

    @Delete('delete/:id')
    async deleteData(@Param('id') id: string): Promise<any> {
        try {
            const data = await this.productService.deleteData(id)
            return data
        } catch (error) {
            console.log(error);
        };
    }

    @Get('image/:product_image')
    async getProductImage(@Param('product_image') productImage: string, @Res() res: Response): Promise<void> {
        const imageBuffer = await this.productService.getGambar(productImage);
        if (imageBuffer) {
            res.setHeader('Content-Type', 'image/jpeg'); 
            res.send(imageBuffer);
        } else {
            res.status(404).json({
                code: 404,
                message: 'Image not found',
            });
        }
    }
}
