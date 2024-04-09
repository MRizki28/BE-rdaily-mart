import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { HttpResponseTraits } from 'app/Traits/HttpResponseTraits';
import { TypeProductModel } from 'app/models/type_product.model';

@Injectable()
export class TypeProductService {
    constructor(
        @InjectModel(TypeProductModel)
        private readonly typeProductModel: typeof TypeProductModel,
    ){}

    async getAllData(page: number= 1, pageSize: number = 0 ): Promise<any> {
        try {
        const offset = (page -1) * pageSize
        const data = await this.typeProductModel.findAll({
            limit: pageSize,
            offset: offset
        })

    if (!data || data.length == 0) {
            return HttpResponseTraits.dataNotFound()
        }else{
            const totalCount = await this.typeProductModel.count()
            const totalPages = Math.ceil(totalCount / pageSize)
            
            let nextUrl = null

            if (page < totalPages) {
                const nextPage = Math.min(page + 1 , totalPages)
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
}
