import { DataTypes, Model } from "sequelize";
import { sequelize } from ".";

export interface IChatAttributes {
    id?: number;
    firstId: number;
    secondId: number;
    lastMessageId: number;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface IChatInstance extends Model<IChatAttributes>, IChatAttributes {}

const Chat = sequelize.define<IChatInstance>("Chat", {
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
    lastMessageId: {
        allowNull: true,
        type: DataTypes.INTEGER,
    },
});

export default Chat;
