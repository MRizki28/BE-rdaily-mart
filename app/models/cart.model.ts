import { BelongsTo, Column, CreatedAt, DataType, ForeignKey, Model, Table, UpdatedAt } from "sequelize-typescript";
import { ProductModel } from "./product.model"


@Table({
    tableName: 'tb_cart'
})

export class CartModel extends Model<CartModel>{
    @Column({
        type: DataType.UUID,
        defaultValue: DataType.UUIDV4,
        allowNull: false,
        primaryKey: true
    })
    id: string;

    @ForeignKey(() => ProductModel)
    @Column({
        type: DataType.UUID,
        allowNull: false
    })
    id_product: string;

    @BelongsTo(() => ProductModel, 'id_product')
    typeProduct: ProductModel;

    @CreatedAt
    created_at: Date;

    @UpdatedAt
    updated_at: Date;
}