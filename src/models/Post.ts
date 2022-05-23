import { DataTypes, Model } from "sequelize";
import { sequelize } from ".";

export interface IPostAttributes {
    id?: number;
    text: string;
    date: Date;
    authorId: number;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface IPostInstance extends Model<IPostAttributes>, IPostAttributes {}

const Post = sequelize.define<IPostInstance>("Post", {
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.UUID,
        unique: true,
    },
    text: {
        allowNull: true,
        type: DataTypes.TEXT,
    },
    date: {
        allowNull: false,
        type: DataTypes.DATE,
    },
    authorId: {
        allowNull: true,
        type: DataTypes.INTEGER,
    },
});

export default Post;
