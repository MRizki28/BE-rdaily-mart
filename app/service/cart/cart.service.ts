import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { HttpResponseTraits } from 'app/Traits/HttpResponseTraits';
import { CartModel } from 'app/models/cart.model';
import { ProductModel } from 'app/models/product.model';
import { CartRequest } from 'app/request/cart/cart.request'
import { Sequelize } from 'sequelize-typescript';


@Injectable()
export class CartService {
    constructor(
        @InjectModel(CartModel)
        private readonly cartModel: typeof CartModel,

        @InjectModel(ProductModel)
        private readonly productModel: typeof ProductModel,
        private readonly sequelize: Sequelize
    ) { }

    async getAllData(): Promise<any> {
        try {
            const data = await this.cartModel.findAll({
                include: ProductModel
            })
            if (!data) {
                return HttpResponseTraits.dataNotFound()
            } else {
                return HttpResponseTraits.success(data)
            }
        } catch (error) {
            console.log(error)
            return (error)
        };
    }

    async addCart(id: string): Promise<any> {
        try {
            return this.sequelize.transaction(async (transaction: any) => {
                const data = await this.cartModel.create({ id_product: id }, { transaction });
                const product = await this.productModel.findByPk(data.id_product, { transaction });
                if (!product) {
                    throw new Error("Product not found");
                }
                product.stok -= 1;
                await product.save({ transaction });
                return HttpResponseTraits.success(data);
            });

        } catch (error) {
            console.log(error);
        };
    }
}
