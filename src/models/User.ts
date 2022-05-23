import { DataTypes, DateOnlyDataType, Model } from "sequelize";
import { sequelize } from ".";

export interface IUserAttributes {
    id?: number;
    login: string;
    password: string;
    birthdate: DateOnlyDataType;
    name: string;
    surname: string;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface IUserInstance extends Model<IUserAttributes>, IUserAttributes {}

const User = sequelize.define<IUserInstance>("User", {
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.UUID,
        unique: true,
    },
    login: {
        allowNull: false,
        type: DataTypes.TEXT,
        unique: true,
    },
    password: {
        allowNull: false,
        type: DataTypes.TEXT,
        unique: true,
    },
    name: {
        allowNull: false,
        type: DataTypes.TEXT,
    },
    surname: {
        allowNull: false,
        type: DataTypes.TEXT,
    },
    birthdate: {
        allowNull: false,
        type: DataTypes.DATEONLY,
    },
});

export default User;
