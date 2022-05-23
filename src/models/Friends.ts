import { DataTypes, Model } from "sequelize";
import { sequelize } from ".";

export interface IFriendsAttributes {
    id?: number;
    firstId: number;
    secondId: number;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface IFriendsInstance extends Model<IFriendsAttributes>, IFriendsAttributes {}

const Friends = sequelize.define<IFriendsInstance>("Friends", {
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

export default Friends;
