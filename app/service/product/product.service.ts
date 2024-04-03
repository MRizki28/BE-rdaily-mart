import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { ProductModel } from '../../models/product.model';
import { HttpResponseTraits } from '../../Traits/HttpResponseTraits';

@Injectable()
export class ProductService {
    constructor(
        @InjectModel(ProductModel)
        private readonly productModel: typeof ProductModel,
    ) { }

    async findAll(): Promise<any> {
        try {
            const data = await this.productModel.findAll();
            if (!data || data.length == 0) {
                return HttpResponseTraits.dataNotFound()
            }else{
                return HttpResponseTraits.success(data)
            }
        } catch (error) {
            console.error('Error while fetching products:', error);
            throw error; 
        }
    }
}
