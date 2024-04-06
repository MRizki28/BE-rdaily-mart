import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { ProductModel } from '../../models/product.model';
import { HttpResponseTraits } from '../../Traits/HttpResponseTraits';
import { ProductRequest } from '../../request/product/product.request';
import { createWriteStream } from 'fs';
import { unlink } from 'fs/promises';
import { v4 as uuidv4 } from 'uuid';

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
    
                let nextUrl = null;
                if (page < totalPages) {
                    const nextPage = Math.min(page + 1, totalPages);
                    nextUrl = `product?page=${nextPage}`;
                }
    
                let prevUrl = null;
                if (page > 1) {
                    const prevPage = page - 1;
                    prevUrl = `product?page=${prevPage}`;
                }
    
                return HttpResponseTraits.success({
                    data: data,
                    currentPage: page,
                    totalPages: totalPages,
                    pageSize: pageSize,
                    totalCount: totalCount,
                    nextPage: nextUrl,
                    prevPage: prevUrl
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
            const filename = `${uuidv4()}-${productImage.originalname}`;
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

    async deleteData(id: string): Promise<any> {
        try {
            const data = await this.productModel.findByPk(id)
            if (!data) {
                return HttpResponseTraits.idOrDataNotFound()
            }

            console.log(data.product_image);
            const imagePath = "./assets/uploads/product/" + data.product_image;
            
            await unlink(imagePath)

            await data.destroy()

            return HttpResponseTraits.delete()
        } catch (error) {
            console.log(error);
        };
        
    }
}
