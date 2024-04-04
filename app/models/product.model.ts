import { Column, CreatedAt, DataType, Model, Table, UpdatedAt } from "sequelize-typescript";

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