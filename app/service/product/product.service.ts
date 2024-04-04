import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { ProductModel } from '../../models/product.model';
import { HttpResponseTraits } from '../../Traits/HttpResponseTraits';
import { ProductRequest } from '../../request/product/product.request';
import * as Joi from 'joi';
import { createWriteStream } from 'fs';

@Injectable()
export class ProductService {
    constructor(
        @InjectModel(ProductModel)
        private readonly productModel: typeof ProductModel,
    ) { }

    async getAllData(): Promise<any> {
        try {
            const data = await this.productModel.findAll();
            if (!data || data.length == 0) {
                return HttpResponseTraits.dataNotFound()
            } else {
                return HttpResponseTraits.success(data)
            }
        } catch (error) {
            console.error('Error while fetching products:', error);
            throw error;
        }
    }

    async createData(productData: any, productImage: any): Promise<any> {
        try {
            const { product_name, stok } = productData;
            const { error } = ProductRequest.validate({ product_name, stok, product_image: productImage });
            
            if (error) {
                const errors = [error.message];
                return HttpResponseTraits.checkValidation(errors);
            }
            const filename = productImage.originalname;
            const uploadPath = `./assets/uploads/product/${filename}`;
            const writeStream = createWriteStream(uploadPath);
            writeStream.write(productImage.buffer);

            const data = await this.productModel.create({
                product_name,
                stok,
                product_image: filename 
            });

            return HttpResponseTraits.success(data);
        } catch (error) {
            console.log(error);
            return {
                message: 'failed'
            };
        }
    }
}
