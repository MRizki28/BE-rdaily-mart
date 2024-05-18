import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { CartModel } from '../../models/cart.model';
import { ProductModel } from '../../models/product.model'; // Import ProductModel
import { CartService } from '../../service/cart/cart.service';
import { CartController } from '../../controllers/cart/cart.controller';

@Module({
    imports: [
        SequelizeModule.forFeature([CartModel, ProductModel]) // Include ProductModel here
    ],
    providers: [CartService],
    controllers: [CartController]
})
export class CartModule {}
