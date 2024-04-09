import { BelongsTo, Column, CreatedAt, DataType, ForeignKey, HasMany, Model, Table, UpdatedAt } from "sequelize-typescript";
import { ProductModel } from "./product.model";

@Table({
    tableName: 'tb_type_product'
})

export class TypeProductModel extends Model<TypeProductModel> {
    @Column({
        type: DataType.UUID,
        defaultValue: DataType.UUIDV4,
        allowNull: false,
        primaryKey: true
    })
    id: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    type_product: string;

    @CreatedAt
    created_at: Date;

    @UpdatedAt
    updated_at: Date;

    @HasMany(() => ProductModel)
    products: ProductModel[];
}