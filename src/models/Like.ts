import { DataTypes, Model } from "sequelize";
import { sequelize } from ".";

export interface ILikeAttributes {
    id?: number;
    postId: number;
    userId: number;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface ILikeInstance extends Model<ILikeAttributes>, ILikeAttributes {}

const Like = sequelize.define<ILikeInstance>("Like", {
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.UUID,
        unique: true,
    },
    postId: {
        allowNull: true,
        type: DataTypes.INTEGER,
    },
    userId: {
        allowNull: true,
        type: DataTypes.INTEGER,
    },
});

export default Like;
