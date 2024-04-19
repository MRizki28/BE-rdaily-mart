import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { TypeProductModel } from '../../models/type_product.model'
import { TypeProductService } from '../../service/typeproduct/typeProduct.service'
import { TypeProductController } from '../../controllers/typeproduct/typeproduct.controller'
@Module({
    imports: [SequelizeModule.forFeature([TypeProductModel])],
    providers: [TypeProductService],
    controllers: [TypeProductController]
})
export class TypeProductModule { }
