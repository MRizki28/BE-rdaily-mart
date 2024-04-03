import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ProductModel } from '../../models/product.model';
import { ProductService } from '../../service/product/product.service';
import { ProductController } from '../../controllers/product/product.controller';

@Module({
    imports: [SequelizeModule.forFeature([ProductModel])],
    providers: [ProductService],
    controllers: [ProductController]
})
export class ProductModule { }
