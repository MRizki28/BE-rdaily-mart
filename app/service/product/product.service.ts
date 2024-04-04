import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { ProductModel } from '../../models/product.model';
import { HttpResponseTraits } from '../../Traits/HttpResponseTraits';
import { ProductRequest } from '../../request/product/product.request';
import { createWriteStream } from 'fs';

@Injectable()
export class ProductService {
    constructor(
        @InjectModel(ProductModel)
        private readonly productModel: typeof ProductModel,
    ) { }

    async getAllData(page: number = 1, pageSize: number = 10): Promise<any> {
        try {
            const offset = (page - 1) * pageSize;
            const data = await this.productModel.findAll({
                limit: pageSize,
                offset: offset
            });
    
            if (!data || data.length == 0) {
                return HttpResponseTraits.dataNotFound();
            } else {
                const totalCount = await this.productModel.count();
                const totalPages = Math.ceil(totalCount / pageSize);
                return HttpResponseTraits.success({
                    data: data,
                    currentPage: page,
                    totalPages: totalPages,
                    pageSize: pageSize,
                    totalCount: totalCount
                });
            }
        } catch (error) {
            console.error('Error while fetching products:', error);
            throw error;
        }
    }
    

    async createData(productData: any, productImage: any): Promise<any> {
        try {
            const { product_name, stok, price } = productData;
            const { error } = ProductRequest.validate({ product_name, price, stok, product_image: productImage });
            
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
                price,
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
