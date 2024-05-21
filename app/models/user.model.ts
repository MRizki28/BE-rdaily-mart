import { Column, CreatedAt, DataType, Model, Table, UpdatedAt } from "sequelize-typescript";



@Table({
    tableName: 'tb_user'
})

export class UserModel extends Model<UserModel> {
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
    username: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    password: string;

    @Column({
        type: DataType.STRING,
        allowNull: true,
    })
    access_token: string;

    @Column({
        type: DataType.STRING,
        allowNull: true,
    })
    refresh_token: string;

    @CreatedAt
    created_at: Date;

    @UpdatedAt
    updated_at: Date;
}