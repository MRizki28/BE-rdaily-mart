import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { HttpResponseTraits } from 'app/Traits/HttpResponseTraits';
import { TypeProductModel } from 'app/models/type_product.model';
import { TypePoductRequest } from 'app/request/typeproduct/typeProduct.request';
@Injectable()
export class TypeProductService {
    constructor(
        @InjectModel(TypeProductModel)
        private readonly typeProductModel: typeof TypeProductModel,
    ) { }

    async getAllData(page: number = 1, pageSize: number = 0): Promise<any> {
        try {
            const offset = (page - 1) * pageSize
            const data = await this.typeProductModel.findAll({
                limit: pageSize,
                offset: offset
            })

            if (!data || data.length == 0) {
                return HttpResponseTraits.dataNotFound()
            } else {
                const totalCount = await this.typeProductModel.count()
                const totalPages = Math.ceil(totalCount / pageSize)

                let nextUrl = null

                if (page < totalPages) {
                    const nextPage = Math.min(page + 1, totalPages)
                    nextUrl = `typeproduct=${nextPage}`
                }

                let prevUrl = null

                if (page > 1) {
                    const prevPage = page - 1
                    nextUrl = `typeproduct=${prevPage}`
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
            console.log(error);
        };
    }

    async createData(typeProductData: any): Promise<any> {
        try {
            const { type_product } = typeProductData;
            const { error } = TypePoductRequest.validate({
                type_product
            })

            if (error) {
                const errors = [error.message];
                return HttpResponseTraits.checkValidation(errors)
            }
            const data = await this.typeProductModel.create({
                type_product
            })

            return HttpResponseTraits.success(data)
        } catch (error) {
            console.log(error);
            return {
                message: 'failed'
            }
        };

    }

    async getDataById(id: string): Promise<any> {
        try {
            const data = await this.typeProductModel.findByPk(id)
            return (!data) ? HttpResponseTraits.idOrDataNotFound() : HttpResponseTraits.success(data)
        } catch (error) {
            console.log(error);
        };
    }

    async updateData(typeProductData: any, id: string): Promise<any> {
        try {
            const data = await this.typeProductModel.findByPk(id)
            if (!data) {
                HttpResponseTraits.idOrDataNotFound()
            } else {
                const { type_product } = typeProductData;
                const { error } = TypePoductRequest.validate({
                    type_product
                })

                return error ? HttpResponseTraits.checkValidation([error.message]) : (() => {
                    data.type_product = type_product
                    data.save()
                    return HttpResponseTraits.success(data)
                })();
            }
        } catch (error) {
            console.log(error);
        };
    }
}
