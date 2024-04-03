import { Controller, Get } from '@nestjs/common';
import { ProductModel } from 'app/models/product.model';
import { ProductService } from 'app/service/product/product.service';
import { response } from 'express';

@Controller('product')
export class ProductController {
    constructor(
        private readonly productService: ProductService
    ) { }

    @Get()
    async findAll(): Promise<any> {
        try {
            const data = await this.productService.findAll();
            return {data}
        } catch (error) {
            console.error('Error while fetching products:', error);
            throw error; 
        }
    }
    
}
