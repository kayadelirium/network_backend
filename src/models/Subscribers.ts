import { DataTypes, Model } from "sequelize";
import { sequelize } from ".";

export interface ISubscribersAttributes {
    id?: number;
    firstId: number;
    secondId: number;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface ISubscribersInstance extends Model<ISubscribersAttributes>, ISubscribersAttributes {}

const Subscribers = sequelize.define<ISubscribersInstance>("Subscribers", {
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.UUID,
        unique: true,
    },
    firstId: {
        allowNull: false,
        type: DataTypes.INTEGER,
    },
    secondId: {
        allowNull: false,
        type: DataTypes.INTEGER,
    },
});

export default Subscribers;
