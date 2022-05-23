import { DataTypes, Model } from "sequelize";
import { sequelize } from ".";

export interface IMessageAttributes {
    id?: number;
    text: string;
    date: Date;
    authorId: number;
    chatId: number;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface IMessageInstance extends Model<IMessageAttributes>, IMessageAttributes {}

const Message = sequelize.define<IMessageInstance>("Message", {
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
    chatId: {
        allowNull: true,
        type: DataTypes.INTEGER,
    },
});

export default Message;
