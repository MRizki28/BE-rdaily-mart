import { Column, DataType, Model, Table } from "sequelize-typescript";

@Table({
    tableName: 'tb_mahasiswa' 
})
export class mahasiswaModel extends Model {
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
    name: string;
}