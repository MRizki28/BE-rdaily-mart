import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { ProductModel } from '../../models/product.model';
import { HttpResponseTraits } from '../../Traits/HttpResponseTraits';
import { ProductRequest } from '../../request/product/product.request';
import { createWriteStream } from 'fs';
import { unlink } from 'fs/promises';
import { v4 as uuidv4 } from 'uuid';
import * as fs from 'fs';
import { TypeProductModel } from 'app/models/type_product.model';


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
                offset: offset,
                include: [TypeProductModel]
            });

            if (!data || data.length == 0) {
                return HttpResponseTraits.dataNotFound();
            } else {
                const totalCount = await this.productModel.count();
                const totalPages = Math.ceil(totalCount / pageSize);
                const nextUrl = (page < totalPages) ? `product?page=${Math.min(page + 1, totalPages)}` : null;
                const prevUrl = (page > 1) ? `product?page=${page - 1}` : null

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
            console.error(error);
            return HttpResponseTraits.errorMessage()
        }
    }

    async getDataById(id: string): Promise<any> {
        try {
            const data = await this.productModel.findByPk(id)
            return (!data) ? HttpResponseTraits.idOrDataNotFound() : HttpResponseTraits.success(data)
        } catch (error) {
            console.log(error);
        };
    }

    async createData(productData: any, productImage: any): Promise<any> {
        try {
            const { product_name, stok, price } = productData;
            const { error } = ProductRequest.validate({ product_name, price, stok, product_image: productImage });
            if (error) {
                return HttpResponseTraits.checkValidation([error.message]);
            } else {
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
            }
        } catch (error) {
            console.log(error);
            return HttpResponseTraits.errorMessage()
        }
    }

    async updateData(productData: any, productImage: any, id: string): Promise<any> {
        try {
            const { product_name, stok, price } = productData
            let updateData = await this.productModel.findByPk(id);
            if (productImage) {
                const filename = `${uuidv4()}-${productImage.originalname}`;
                const uploadPath = `./assets/uploads/product/${filename}`;
                const writeStream = createWriteStream(uploadPath);
                writeStream.write(productImage.buffer);
                if (updateData.product_image) {
                    await unlink(`./assets/uploads/product/${updateData.product_image}`);
                }
                updateData.product_image = product_name
                updateData.stok = stok
                updateData.price = price
                updateData.product_image = filename
            } else {
                updateData.product_name = product_name;
                updateData.price = price;
                updateData.stok = stok;
            }
            await updateData.save();

            return HttpResponseTraits.success(updateData)
        } catch (error) {
            console.log(error);
            return HttpResponseTraits.errorMessage()
        };

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
            return HttpResponseTraits.errorMessage()
        };

    }

    async getGambar(product_image: string): Promise<Buffer | null> {
        try {
            const product = await this.productModel.findOne({
                where: { product_image },
            });

            if (!product) {
                throw new Error('Image not found');
            }
            const imagePath = `./assets/uploads/product/${product.product_image}`;
            const imageBuffer = fs.readFileSync(imagePath);
            return imageBuffer;
        } catch (error) {
            console.log(error);
            return null;
        }
    }
}
