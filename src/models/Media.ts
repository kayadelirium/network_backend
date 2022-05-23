import { DataTypes, Model } from "sequelize";
import { sequelize } from ".";

export interface IMediaAttributes {
    id?: number;
    type: string;
    path: string;
    postId: number;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface IMediaInstance extends Model<IMediaAttributes>, IMediaAttributes {}

const Media = sequelize.define<IMediaInstance>("Media", {
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.UUID,
        unique: true,
    },
    type: {
        allowNull: false,
        type: DataTypes.TEXT,
    },
    path: {
        allowNull: false,
        type: DataTypes.TEXT,
    },
    postId: {
        allowNull: true,
        type: DataTypes.INTEGER,
    },
});

export default Media;
