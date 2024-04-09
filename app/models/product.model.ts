import { allow } from "joi";
import { AllowNull, BelongsTo, Column, CreatedAt, DataType, ForeignKey, Model, Table, UpdatedAt } from "sequelize-typescript";
import { TypeProductModel } from "./type_product.model";

@Table({
    tableName: 'tb_product' 
})
export class ProductModel extends Model<ProductModel> {
    @Column({
        type: DataType.UUID,
        defaultValue: DataType.UUIDV4,
        allowNull: false,
        primaryKey: true
    })
    id: string;

    @ForeignKey(() => TypeProductModel)
    @Column({
        type: DataType.UUID,
        allowNull: false
    })
    id_type_product: string;

    @BelongsTo(() => TypeProductModel, 'id_type_product')
    typeProduct: TypeProductModel;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    product_name: string;

    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    price: number;

    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    stok: number;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    product_image: string;

    @CreatedAt
    created_at: Date;

    @UpdatedAt
    updated_at: Date;

}